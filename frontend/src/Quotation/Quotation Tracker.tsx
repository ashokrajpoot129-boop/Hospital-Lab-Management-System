import { useMemo, useState } from 'react'

const quotations = [
  { id: 'QT-2026-0142', customer: 'Aarav Sharma', services: 'Complete Blood Count, Lipid Profile', date: '11 Oct 2026', amount: '₹1,250', status: 'Sent' },
  { id: 'QT-2026-0141', customer: 'Sunrise Clinic', services: 'Routine wellness panel', date: '10 Oct 2026', amount: '₹8,400', status: 'Accepted' },
  { id: 'QT-2026-0140', customer: 'Meera Patel', services: 'Thyroid Profile', date: '09 Oct 2026', amount: '₹900', status: 'Pending' },
]

const tableHeadClass = 'border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500'
const tableCellClass = 'border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700'

export default function QuotationTracker() {
  const [query, setQuery] = useState('')
  const filteredQuotations = useMemo(
    () => quotations.filter((quotation) =>
      `${quotation.id} ${quotation.customer} ${quotation.services} ${quotation.status}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
    [query],
  )

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Quotation Tracker</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Track quotation status, value, and customer details.</p>
        </div>
      </div>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-[18px] max-[520px]:flex-wrap">
          <h2 className="m-0 text-base font-semibold text-slate-800">Quotations</h2>
          <label>
            <span className="sr-only">Search quotations</span>
            <input
              className="min-h-[37px] w-[min(280px,38vw)] rounded-[7px] border border-slate-200 bg-white px-[11px] py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="search"
              placeholder="Search quotations"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className={tableHeadClass}>Quotation ID</th>
                <th className={tableHeadClass}>Customer</th>
                <th className={tableHeadClass}>Services</th>
                <th className={tableHeadClass}>Created</th>
                <th className={tableHeadClass}>Amount</th>
                <th className={tableHeadClass}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td className={`${tableCellClass} font-semibold text-blue-600`}>{quotation.id}</td>
                  <td className={tableCellClass}>{quotation.customer}</td>
                  <td className={tableCellClass}>{quotation.services}</td>
                  <td className={tableCellClass}>{quotation.date}</td>
                  <td className={tableCellClass}>{quotation.amount}</td>
                  <td className={tableCellClass}><span className="inline-flex rounded-full bg-blue-50 px-[9px] py-1 text-[11px] text-blue-700">{quotation.status}</span></td>
                </tr>
              ))}
              {filteredQuotations.length === 0 && (
                <tr><td className={`${tableCellClass} p-[26px] text-center text-slate-500`} colSpan={6}>No quotations match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
