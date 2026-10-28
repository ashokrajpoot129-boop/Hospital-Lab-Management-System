import { useState } from 'react'

const followUps = [
  { id: 'QT-2026-0142', customer: 'Aarav Sharma', due: '12 Oct 2026', status: 'Call customer' },
  { id: 'QT-2026-0140', customer: 'Meera Patel', due: '12 Oct 2026', status: 'Awaiting response' },
  { id: 'QT-2026-0138', customer: 'Northside Diagnostics', due: '13 Oct 2026', status: 'Send reminder' },
]

const tableHeadClass = 'border-t border-slate-100 bg-slate-50 px-4 py-[13px] text-left text-[11px] font-semibold text-slate-500'
const tableCellClass = 'border-t border-slate-100 px-4 py-[13px] text-xs text-slate-700'

export default function QuotationFollowUp() {
  const [completed, setCompleted] = useState<string[]>([])

  function markComplete(id: string) {
    setCompleted((current) => current.includes(id) ? current : [...current, id])
  }

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Quotation Follow-up</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Review pending customer follow-ups for sent quotations.</p>
        </div>
      </div>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 px-4 py-[18px]">
          <h2 className="m-0 text-base font-semibold text-slate-800">Follow-up tasks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className={tableHeadClass}>Quotation ID</th>
                <th className={tableHeadClass}>Customer</th>
                <th className={tableHeadClass}>Follow-up date</th>
                <th className={tableHeadClass}>Next step</th>
                <th className={tableHeadClass}>Action</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((item) => {
                const isComplete = completed.includes(item.id)
                return (
                  <tr key={item.id}>
                    <td className={`${tableCellClass} font-semibold text-blue-600`}>{item.id}</td>
                    <td className={tableCellClass}>{item.customer}</td>
                    <td className={tableCellClass}>{item.due}</td>
                    <td className={tableCellClass}>{isComplete ? 'Completed' : item.status}</td>
                    <td className={tableCellClass}>
                      <button
                        className="min-h-[38px] rounded-[7px] border border-blue-700 bg-blue-600 px-[15px] text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-55"
                        disabled={isComplete}
                        onClick={() => markComplete(item.id)}
                        type="button"
                      >
                        {isComplete ? 'Done' : 'Mark complete'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
