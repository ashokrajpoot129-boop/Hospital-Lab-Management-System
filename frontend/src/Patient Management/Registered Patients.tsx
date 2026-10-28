import { useMemo, useState } from 'react'

const patients = [
  { id: 'LIMS-24081', patient: 'Aarav Sharma', test: 'Complete Blood Count', date: '11 Oct 2026', status: 'Registered' },
  { id: 'LIMS-24080', patient: 'Meera Patel', test: 'Lipid Profile', date: '11 Oct 2026', status: 'In progress' },
  { id: 'LIMS-24079', patient: 'Kabir Khan', test: 'Thyroid Profile', date: '10 Oct 2026', status: 'Awaiting sample' },
]

export default function RegisteredPatients() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => patients.filter((row) =>
    `${row.id} ${row.patient} ${row.test} ${row.status}`.toLowerCase().includes(query.toLowerCase()),
  ), [query])

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Registered Patients</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Search and review recently registered patients and their orders.</p>
        </div>
      </div>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-[18px] max-[520px]:flex-wrap">
          <h2 className="m-0 text-base font-semibold text-slate-800">Patient records</h2>
          <label>
            <span className="sr-only">Search patient records</span>
            <input className="min-h-[37px] w-[min(280px,38vw)] rounded-[7px] border border-slate-200 bg-white px-[11px] py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" type="search" placeholder="Search patients or tests" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead><tr>{['Accession ID', 'Patient', 'Test', 'Date', 'Status'].map((heading) => <th className="border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500" key={heading}>{heading}</th>)}</tr></thead>
            <tbody>
              {filtered.map((row) => <tr key={row.id}>
                <td className="border-t border-slate-100 px-4 py-[13px] text-xs font-semibold text-blue-600">{row.id}</td>
                <td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.patient}</td>
                <td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.test}</td>
                <td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.date}</td>
                <td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700"><span className="inline-flex rounded-full bg-blue-50 px-[9px] py-1 text-[11px] text-blue-700">{row.status}</span></td>
              </tr>)}
              {filtered.length === 0 && <tr><td className="border-t border-slate-100 p-[26px] text-center text-xs text-slate-500" colSpan={5}>No records match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
