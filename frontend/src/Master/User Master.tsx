import { useEffect, useMemo, useState, type FormEvent } from 'react'

type UserRecord = Record<string, string>
const fields = ['User name', 'Username', 'Role', 'Mobile number']
const inputClass = 'min-h-[39px] w-full rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'

export default function UserMaster() {
  const [records, setRecords] = useState<UserRecord[]>([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/masters/User%20Master')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load user records')))
      .then(setRecords)
      .catch((error) => setMessage(error.message))
  }, [])

  const filteredRecords = useMemo(() => records.filter((record) => Object.values(record).join(' ').toLowerCase().includes(query.toLowerCase())), [query, records])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const record = Object.fromEntries(fields.map((field) => [field, String(data.get(field) ?? '')]))
    try {
      const response = await fetch('/api/masters/User%20Master', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) })
      const saved = await response.json()
      if (!response.ok) throw new Error(saved.error || 'Unable to save user record')
      setRecords((current) => [saved, ...current])
      setMessage('User record saved successfully.')
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save user record')
    }
  }

  return <><div className="mb-[18px] flex items-center gap-3"><span className="grid size-[33px] place-items-center border-2 border-slate-800 text-green-700">▤</span><div><h1 className="text-[29px] font-bold text-slate-800">User Master</h1><p className="mt-[5px] text-[13px] text-slate-500">Manage user accounts, roles, and access details.</p></div></div>
    <form className="mb-4 rounded-xl border border-slate-200 bg-white p-[22px] shadow-sm" onSubmit={handleSubmit}><h2 className="mb-[18px] text-base font-semibold">Add User</h2><div className="grid grid-cols-2 gap-x-5 gap-y-[18px] max-[760px]:grid-cols-1">{fields.map((field) => <label className="flex flex-col gap-[7px] text-xs font-semibold" key={field}><span>{field}</span>{field === 'Role' ? <select className={inputClass} name={field} required defaultValue=""><option value="" disabled>Select role</option><option>Administrator</option><option>Technician</option><option>Receptionist</option></select> : <input className={inputClass} name={field} required placeholder={`Enter ${field.toLowerCase()}`} />}</label>)}</div><div className="mt-[22px] flex items-center justify-between border-t border-slate-100 pt-[17px]"><span className="text-[11px] text-slate-500">Records are saved to the User Master database.</span><button className="min-h-[38px] rounded-[7px] bg-blue-600 px-[15px] text-xs font-semibold text-white" type="submit">Add record</button></div>{message && <p className="mt-3 text-xs text-green-800" role="status">{message}</p>}</form>
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between px-4 py-[18px]"><h2 className="text-base font-semibold">User Master records ({records.length})</h2><input className="min-h-[37px] w-[280px] rounded-[7px] border border-slate-200 px-[11px] text-[13px]" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search user master" /></div><div className="overflow-x-auto"><table className="w-full border-collapse text-left whitespace-nowrap"><thead><tr>{fields.map((field) => <th className="border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-[11px] text-slate-500" key={field}>{field}</th>)}</tr></thead><tbody>{filteredRecords.map((record, index) => <tr key={index}>{fields.map((field) => <td className="border-t border-slate-100 px-4 py-[13px] text-xs" key={field}>{record[field]}</td>)}</tr>)}{filteredRecords.length === 0 && <tr><td className="border-t border-slate-100 p-[26px] text-center text-xs text-slate-500" colSpan={fields.length}>No user records found.</td></tr>}</tbody></table></div></section></>
}
