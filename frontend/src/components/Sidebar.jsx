export default function Sidebar({ activePage, patientPages, quotationPages, masterPages }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-[220px] overflow-y-auto border-r border-slate-200 bg-white px-3 pt-[19px] pb-6 max-[760px]:w-[190px] max-[520px]:w-[145px] max-[520px]:px-2">
      <a className="flex min-h-10 items-center gap-[9px] px-[10px] pt-0.5 pb-3 text-inherit no-underline max-[520px]:px-0" href="#/dashboard" aria-label="LIMS home">
        <span className="grid size-[25px] shrink-0 place-items-center text-[21px]" aria-hidden="true">🧪</span>
        <span className="flex flex-col leading-tight">
          <strong className="text-base text-blue-600">LIMS</strong>
          <small className="mt-[3px] text-[9px] text-slate-500 max-[520px]:text-[8px]">Lab Information System</small>
        </span>
      </a>

      <nav className="flex flex-col gap-1" aria-label="Main navigation">
        <a
          className={`mb-[10px] block rounded-[7px] px-[10px] py-[9px] text-sm leading-[1.45] text-[#243b5a] no-underline transition-colors hover:bg-slate-100 max-[520px]:px-[7px] max-[520px]:py-2 max-[520px]:text-[11px] ${activePage === 'dashboard' ? 'bg-blue-100 text-blue-600' : ''}`}
          href="#/dashboard"
        >
          Dashboard
        </a>

        <p className="mx-2 my-[2px] mb-px text-[10px] leading-[1.4] font-semibold text-slate-600 uppercase">Patient Management</p>
        <div className="flex flex-col gap-0.5">
          {patientPages.map((item) => (
            <a
              className={`block rounded-[7px] px-[10px] py-[9px] text-sm leading-[1.45] text-[#243b5a] no-underline transition-colors hover:bg-slate-100 max-[520px]:px-[7px] max-[520px]:py-2 max-[520px]:text-[11px] ${activePage === item.slug ? 'bg-blue-100 text-blue-600' : ''}`}
              href={`#/patient-management/${item.slug}`}
              key={item.slug}
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="mx-2 mt-[14px] mb-0.5 text-[10px] leading-[1.4] font-semibold text-slate-600 uppercase">Quotation</p>
        {quotationPages.map((item) => (
          <a
            className={`block rounded-[7px] px-[10px] py-[9px] text-sm leading-[1.45] text-[#243b5a] no-underline transition-colors hover:bg-slate-100 max-[520px]:px-[7px] max-[520px]:py-2 max-[520px]:text-[11px] ${activePage === item.slug ? 'bg-blue-100 text-blue-600' : ''}`}
            href={`#/${item.slug}`}
            key={item.slug}
          >
            {item.label}
          </a>
        ))}

        <p className="mx-2 mt-[14px] mb-0.5 text-[10px] leading-[1.4] font-semibold text-slate-600 uppercase">Master</p>
        <div className="flex flex-col gap-0.5">
          {masterPages.map((item) => (
            <a
              className={`block rounded-[7px] px-[10px] py-[9px] text-sm leading-[1.45] text-[#243b5a] no-underline transition-colors hover:bg-slate-100 max-[520px]:px-[7px] max-[520px]:py-2 max-[520px]:text-[11px] ${activePage === item.slug ? 'bg-blue-100 text-blue-600' : ''}`}
              href={`#/master/${item.slug}`}
              key={item.slug}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  )
}
