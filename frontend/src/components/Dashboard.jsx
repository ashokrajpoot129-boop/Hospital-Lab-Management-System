export default function Dashboard() {
  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▥</span>
        <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Dashboard</h1>
      </div>
      <section className="min-h-[116px] rounded-xl border border-slate-200 bg-white px-4 pt-8 pb-6 shadow-sm">
        <h2 className="m-0 text-base font-semibold text-slate-800">System status</h2>
        <p className="mt-[15px] text-xs leading-relaxed text-slate-500">
          Patient, sample, and report workflows are ready to use. Connect your
          backend API and PostgreSQL database to enable persistent records.
        </p>
      </section>
    </>
  )
}
