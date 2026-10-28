import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lab', waitForConnections: true, connectionLimit: 10,
})

const masterResources = {
  users: { table: 'users', columns: { 'User name': 'user_name', Username: 'username', Role: 'role', 'Mobile number': 'mobile_number' } },
  doctors: { table: 'doctors', columns: { 'Doctor name': 'doctor_name', 'Registration number': 'registration_number', Speciality: 'speciality', 'Mobile number': 'mobile_number' } },
  tests: { table: 'tests', columns: { 'Test name': 'test_name', 'Test code': 'test_code', Department: 'department', 'Sample type': 'sample_type', Price: 'price' } },
  packages: { table: 'packages', columns: { 'Package name': 'package_name', 'Package code': 'package_code', 'Tests included': 'tests_included', Price: 'price' } },
  accounts: { table: 'accounts', columns: { 'Account name': 'account_name', 'Account code': 'account_code', 'Account type': 'account_type', 'Opening balance': 'opening_balance' } },
  reportFormats: { table: 'report_formats', columns: { 'Format name': 'format_name', 'Test name': 'test_name', Version: 'version', Status: 'status' } },
  flags: { table: 'flags', columns: { 'Flag name': 'flag_name', 'Flag code': 'flag_code', Condition: 'flag_condition', Severity: 'severity' } },
  bills: { table: 'bills', columns: { 'Bill number': 'bill_number', 'Patient name': 'patient_name', Amount: 'amount', 'Payment status': 'payment_status' } },
  collections: { table: 'accounting_collections', columns: { 'Receipt number': 'receipt_number', 'Patient or account': 'patient_or_account', Amount: 'amount', 'Payment mode': 'payment_mode' } },
  labProfile: { table: 'lab_profile', columns: { 'Lab name': 'lab_name', 'Registration number': 'registration_number', 'Phone number': 'phone_number', Email: 'email', Address: 'address' } },
}

const masterKeyMap = { 'User Master':'users', 'Doctor Master':'doctors', 'Test Master':'tests', 'Package Master':'packages', 'Account Master':'accounts', 'Report Format Master':'reportFormats', 'Flag Master':'flags', 'Bill Master':'bills', 'Accounting Collection Master':'collections', 'Lab Profile':'labProfile' }

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }) } catch (error) { res.status(500).json({ ok: false, error: error.message }) }
})

app.get('/api/masters/:page', async (req, res, next) => {
  try {
    const key = masterKeyMap[req.params.page] || masterKeyMap[req.params.page.replace(/-/g, ' ')]
    const resource = masterResources[key]
    if (!resource) return res.status(404).json({ error: 'Unknown master' })
    const [rows] = await pool.query(`SELECT * FROM \`${resource.table}\` ORDER BY id DESC`)
    res.json(rows.map((row) => Object.fromEntries(Object.entries(resource.columns).map(([label, column]) => [label, row[column] ?? '']))))
  } catch (error) { next(error) }
})

app.post('/api/masters/:page', async (req, res, next) => {
  try {
    const key = masterKeyMap[req.params.page]
    const resource = masterResources[key]
    if (!resource) return res.status(404).json({ error: 'Unknown master' })
    const entries = Object.entries(resource.columns).map(([label, column]) => [column, req.body[label] ?? null]).filter(([, value]) => value !== null)
    if (!entries.length) return res.status(400).json({ error: 'No fields provided' })
    const columns = entries.map(([column]) => `\`${column}\``).join(', ')
    const placeholders = entries.map(() => '?').join(', ')
    const [result] = await pool.query(`INSERT INTO \`${resource.table}\` (${columns}) VALUES (${placeholders})`, entries.map(([, value]) => value))
    const [rows] = await pool.query(`SELECT * FROM \`${resource.table}\` WHERE id = ?`, [result.insertId])
    const row = rows[0]
    res.status(201).json(Object.fromEntries(Object.entries(resource.columns).map(([label, column]) => [label, row[column] ?? ''])))
  } catch (error) { next(error) }
})

function accessionId() { return `LIMS-${Date.now().toString().slice(-8)}` }

app.get('/api/patients', async (_req, res, next) => {
  try { const [rows] = await pool.query(`SELECT id, accession_id, patient_name, age, mobile_number, gender, referring_doctor, tests_ordered, status, created_at FROM patients ORDER BY id DESC`); res.json(rows) } catch (error) { next(error) }
})

app.post('/api/patients', async (req, res, next) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const id = accessionId()
    const { patientName, age, mobileNumber, gender, referringDoctor, testsOrdered } = req.body
    const [patientResult] = await connection.query(`INSERT INTO patients (accession_id, patient_name, age, mobile_number, gender, referring_doctor, tests_ordered) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, patientName, age || null, mobileNumber || null, gender || null, referringDoctor || null, testsOrdered || null])
    await connection.query(`INSERT INTO patient_orders (accession_id, patient_id) VALUES (?, ?)`, [id, patientResult.insertId])
    await connection.commit()
    res.status(201).json({ accession_id: id, patient_name: patientName, status: 'Registered' })
  } catch (error) { await connection.rollback(); next(error) } finally { connection.release() }
})

app.get('/api/quotations', async (_req, res, next) => {
  try { const [rows] = await pool.query('SELECT * FROM quotations ORDER BY id DESC'); res.json(rows) } catch (error) { next(error) }
})

app.post('/api/quotations', async (req, res, next) => {
  try {
    const q = req.body
    const number = `QT-${Date.now().toString().slice(-8)}`
    await pool.query(`INSERT INTO quotations (quotation_number, quotation_for, contact_number, doctor_or_organization, valid_until, tests_or_services, estimated_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Generated')`, [number, q.quotationFor, q.contactNumber || null, q.doctorOrOrganization || null, q.validUntil, q.testsOrServices, q.estimatedAmount])
    res.status(201).json({ quotation_number: number })
  } catch (error) { next(error) }
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(error.code?.startsWith('ER_') ? 400 : 500).json({ error: error.code === 'ER_DUP_ENTRY' ? 'Duplicate value already exists' : error.message })
})

const port = Number(process.env.PORT || 5000)
app.listen(port, () => console.log(`LIMS backend running on http://localhost:${port}`))
