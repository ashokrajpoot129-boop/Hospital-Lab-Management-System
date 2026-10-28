const samples = [
  { id: 'LIMS-24076', patient: 'Isha Verma', test: 'CBC', date: '11 Oct 2026', status: 'Held - insufficient volume' },
  { id: 'LIMS-24071', patient: 'Rohan Das', test: 'Glucose', date: '10 Oct 2026', status: 'Rejected - clotted sample' },
]

export default function RejectedHeldSamples() {
  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div><h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Rejected &amp; Held Samples</h1><p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Review specimens that need recollection or additional attention.</p></div>
      </div>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-[18px]"><h2 className="m-0 text-base font-semibold text-slate-800">Rejected and held samples</h2></div>
        <div className="overflow-x-auto"><table className="w-full border-collapse text-left whitespace-nowrap">
          <thead><tr>{['Accession ID', 'Patient', 'Test', 'Date', 'Reason'].map((heading) => <th className="border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500" key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{samples.map((row) => <tr key={row.id}>
            <td className="border-t border-slate-100 px-4 py-[13px] text-xs font-semibold text-blue-600">{row.id}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.patient}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.test}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700">{row.date}</td><td className="border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700"><span className="inline-flex rounded-full bg-amber-50 px-[9px] py-1 text-[11px] text-amber-700">{row.status}</span></td>
          </tr>)}</tbody>
        </table></div>
      </section>
    </>
  )
}
