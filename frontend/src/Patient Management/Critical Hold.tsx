import { useState, type FormEvent } from 'react'

const criticalResults = [
  { id: 'LIMS-24068', patient: 'Anaya Singh', test: 'Potassium: 6.4 mmol/L', date: '11 Oct 2026', status: 'Urgent review' },
  { id: 'LIMS-24055', patient: 'Dev Mehta', test: 'Hemoglobin: 6.8 g/dL', date: '11 Oct 2026', status: 'Awaiting acknowledgement' },
]

export default function CriticalHold() {
  const [message, setMessage] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Preview only. Connect the backend to record critical result acknowledgement.')
  }
  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div><h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Critical Hold</h1><p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Monitor critical results that require immediate review.</p></div>
      </div>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-[18px]"><h2 className="m-0 text-base font-semibold text-slate-800">Critical results</h2></div>
        <div className="overflow-x-auto"><table className="w-full border-collapse text-left whitespace-nowrap">
          <thead><tr>{['Accession ID', 'Patient', 'Critical result', 'Date', 'Status'].map((heading) => <th className="border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500" key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{criticalResults.map((row) => <tr key={row.id}>
            <td className="border-t border-slate-100 px-4 py-[13px] text-xs font-semibold text-blue-600">{row.id}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.patient}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs font-semibold text-red-700">{row.test}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.date}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700"><span className="inline-flex rounded-full bg-red-50 px-[9px] py-1 text-[11px] text-red-700">{row.status}</span></td>
          </tr>)}</tbody>
        </table></div>
      </section>
      <form className="mt-[14px] flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm max-[760px]:items-start max-[760px]:flex-col" onSubmit={handleSubmit}>
        <div><h2 className="m-0 text-base font-semibold text-slate-800">Acknowledge critical result</h2><p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">Connect the backend to record this acknowledgement.</p></div>
        <button className="min-h-[38px] rounded-[7px] border border-red-700 bg-red-600 px-[15px] text-xs font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300" type="submit">Acknowledge critical result</button>
      </form>
      {message && <p className="mt-3.5 text-xs text-green-800" role="status">{message}</p>}
    </>
  )
}
