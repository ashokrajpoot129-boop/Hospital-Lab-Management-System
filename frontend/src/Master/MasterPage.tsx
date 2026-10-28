import { useEffect, useMemo, useState, type FormEvent } from 'react'

type MasterConfig = {
  title: string
  description: string
  fields: string[]
}

type MasterRecord = Record<string, string>

const cardClass = 'mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
const toolbarClass = 'flex items-center justify-between gap-4 px-4 py-[18px] max-[520px]:flex-wrap'
const inputClass = 'min-h-[39px] w-full rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] font-normal text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
const tableHeadClass = 'border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500'
const tableCellClass = 'border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700'
const buttonClass = 'min-h-[38px] rounded-[7px] border border-blue-700 bg-blue-600 px-[15px] text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'

export const masterConfigs: Record<string, MasterConfig> = {
  'User Master': {
    title: 'User Master',
    description: 'Manage user accounts, roles, and access details.',
    fields: ['User name', 'Username', 'Role', 'Mobile number'],
  },
  'Doctor Master': {
    title: 'Doctor Master',
    description: 'Maintain referring doctor and practitioner details.',
    fields: ['Doctor name', 'Registration number', 'Speciality', 'Mobile number'],
  },
  'Test Master': {
    title: 'Test Master',
    description: 'Manage laboratory tests, sample types, and pricing.',
    fields: ['Test name', 'Test code', 'Department', 'Sample type', 'Price'],
  },
  'Package Master': {
    title: 'Package Master',
    description: 'Create and maintain groups of laboratory tests.',
    fields: ['Package name', 'Package code', 'Tests included', 'Price'],
  },
  'Account Master': {
    title: 'Account Master',
    description: 'Maintain account names, codes, and account types.',
    fields: ['Account name', 'Account code', 'Account type', 'Opening balance'],
  },
  'Report Format Master': {
    title: 'Report Format Master',
    description: 'Manage report formats used for laboratory results.',
    fields: ['Format name', 'Test name', 'Version', 'Status'],
  },
  'Flag Master': {
    title: 'Flag Master',
    description: 'Configure result flags, conditions, and severity levels.',
    fields: ['Flag name', 'Flag code', 'Condition', 'Severity'],
  },
  'Bill Master': {
    title: 'Bill Master',
    description: 'Review and manage billing records.',
    fields: ['Bill number', 'Patient name', 'Amount', 'Payment status'],
  },
  'Accounting Collection Master': {
    title: 'Accounting Collection Master',
    description: 'Record and review payments collected by the laboratory.',
    fields: ['Receipt number', 'Patient or account', 'Amount', 'Payment mode'],
  },
  'Lab Profile': {
    title: 'Lab Profile',
    description: 'Maintain the laboratory identity and contact information.',
    fields: ['Lab name', 'Registration number', 'Phone number', 'Email', 'Address'],
  },
}

export default function MasterPage({ page }: { page: string }) {
  const config = masterConfigs[page]
  const [records, setRecords] = useState<MasterRecord[]>([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`/api/masters/${encodeURIComponent(page)}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load records')))
      .then((loaded) => setRecords(loaded))
      .catch((error) => setMessage(error.message))
  }, [page])

  const filteredRecords = useMemo(
    () => records.filter((record) =>
      Object.values(record).join(' ').toLowerCase().includes(query.toLowerCase()),
    ),
    [query, records],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const record = Object.fromEntries(
      config.fields.map((field) => [field, String(data.get(field) ?? '')]),
    )
    try {
      const response = await fetch(`/api/masters/${encodeURIComponent(page)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record),
      })
      const saved = await response.json()
      if (!response.ok) throw new Error(saved.error || 'Unable to save record')
      setRecords((current) => [saved, ...current])
      setMessage('Record saved successfully.')
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save record')
    }
  }

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">{config.title}</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">{config.description}</p>
        </div>
      </div>

      <form className={`${cardClass} p-[22px] max-[520px]:p-4`} onSubmit={handleSubmit}>
        <div className="-mx-[22px] -mt-[22px] mb-[18px] flex items-center justify-between gap-4 px-4 py-[18px] max-[520px]:-mx-4 max-[520px]:-mt-4">
          <h2 className="m-0 text-base font-semibold text-slate-800">Add {config.title.replace(' Master', '')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] max-[760px]:grid-cols-1">
          {config.fields.map((field) => (
            <label className="flex flex-col gap-[7px] text-xs font-semibold text-slate-700" key={field}>
              <span>{field}</span>
              {field === 'Address' || field === 'Tests included' || field === 'Condition' ? (
                <textarea className={`${inputClass} resize-y`} name={field} required rows={2} placeholder={`Enter ${field.toLowerCase()}`} />
              ) : (
                <input
                  className={inputClass}
                  name={field}
                  required
                  type={field === 'Price' || field === 'Opening balance' || field === 'Amount' ? 'number' : 'text'}
                  min={field === 'Price' || field === 'Opening balance' || field === 'Amount' ? 0 : undefined}
                  step={field === 'Price' || field === 'Opening balance' || field === 'Amount' ? '0.01' : undefined}
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-[22px] flex items-center justify-between gap-4 border-t border-slate-100 pt-[17px] max-[760px]:items-start max-[760px]:flex-col">
          <span className="text-[11px] leading-relaxed text-slate-500">Records added here are temporary until a backend is connected.</span>
          <button className={buttonClass} type="submit">Add record</button>
        </div>
        {message && <p className="mt-3.5 text-xs text-green-800" role="status">{message}</p>}
      </form>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className={toolbarClass}>
          <h2 className="m-0 text-base font-semibold text-slate-800">{config.title} records <span className="text-slate-500">({records.length})</span></h2>
          <label>
            <span className="sr-only">Search {config.title} records</span>
            <input
              className="min-h-[37px] w-[min(280px,38vw)] rounded-[7px] border border-slate-200 bg-white px-[11px] py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="search"
              placeholder={`Search ${config.title.toLowerCase()}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr>
                {config.fields.map((field) => <th className={tableHeadClass} key={field}>{field}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={`${config.title}-${index}`}>
                  {config.fields.map((field, fieldIndex) => (
                    <td className={`${tableCellClass} ${fieldIndex === 0 ? 'font-semibold text-blue-600' : ''}`} key={field}>
                      {record[field]}
                    </td>
                  ))}
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td className={`${tableCellClass} p-[26px] text-center text-slate-500`} colSpan={config.fields.length}>
                    {records.length === 0
                      ? `No ${config.title.toLowerCase()} records have been added yet.`
                      : 'No records match your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
