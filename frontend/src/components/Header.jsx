export default function Header({ heading, patientPages, quotationPages, masterPages }) {
  function navigateTo(nextPage) {
    window.location.hash = nextPage === 'dashboard'
      ? '/dashboard'
      : quotationPages.some((item) => item.slug === nextPage)
        ? `/${nextPage}`
        : masterPages.some((item) => item.slug === nextPage)
          ? `/master/${nextPage}`
          : `/patient-management/${nextPage}`
  }

  return (
    <header className="flex min-h-[65px] items-center justify-between gap-5 border-b border-slate-200 bg-slate-50 px-[18px] py-3 max-[520px]:px-[11px]">
      <div className="flex flex-col gap-0.5">
        <strong className="text-sm font-semibold text-slate-800">{heading}</strong>
        <span className="text-[11px] text-slate-500 max-[520px]:max-w-[150px]">Persistent PostgreSQL application</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="page-picker">Go to page</label>
        <select
          className="size-[25px] cursor-pointer rounded-[2px] border border-slate-400 bg-white p-0 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          id="page-picker"
          aria-label="Go to page"
          value=""
          onChange={(event) => navigateTo(event.target.value)}
        >
          <option value=""></option>
          <option value="dashboard">Dashboard</option>
          {patientPages.map((item) => (
            <option key={item.slug} value={item.slug}>{item.label}</option>
          ))}
          {quotationPages.map((item) => (
            <option key={item.slug} value={item.slug}>{item.label}</option>
          ))}
          {masterPages.map((item) => (
            <option key={item.slug} value={item.slug}>{item.label}</option>
          ))}
        </select>
        <span className="inline-flex min-h-9 items-center rounded-lg bg-slate-200 px-[14px] text-sm text-[#243b5a] max-[760px]:hidden">{heading}</span>
      </div>
    </header>
  )
}
