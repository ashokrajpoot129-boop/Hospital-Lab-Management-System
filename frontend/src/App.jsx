import { useEffect, useState } from 'react'
import NewRegistration from './Patient Management/New Registration.tsx'
import BulkRegistration from './Patient Management/Bulk Registration.tsx'
import RegisteredPatients from './Patient Management/Registered Patients.tsx'
import SampleAccessioning from './Patient Management/Sample Accessioning.tsx'
import RejectedHeldSamples from './Patient Management/Rejected & Held Samples.tsx'
import TestTracker from './Patient Management/Test Tracker.tsx'
import ResultEntry from './Patient Management/Result Entry.tsx'
import ApproveReport from './Patient Management/Approve Report.tsx'
import CriticalHold from './Patient Management/Critical Hold.tsx'
import QuotationGenerator from './Quotation/Quotation Generator.tsx'
import QuotationTracker from './Quotation/Quotation Tracker.tsx'
import QuotationFollowUp from './Quotation/Quotation Follow-up.tsx'
import UserMaster from './Master/User Master.tsx'
import DoctorMaster from './Master/Doctor Master.tsx'
import TestMaster from './Master/Test Master.tsx'
import PackageMaster from './Master/Package Master.tsx'
import AccountMaster from './Master/Account Master.tsx'
import ReportFormatMaster from './Master/Report Format Master.tsx'
import FlagMaster from './Master/Flag Master.tsx'
import BillMaster from './Master/Bill Master.tsx'
import AccountingCollectionMaster from './Master/Accounting Collection Master.tsx'
import LabProfile from './Master/Lab Profile.tsx'

const patientPages = [
  { label: 'New Registration', slug: 'new-registration', component: NewRegistration },
  { label: 'Bulk Registration', slug: 'bulk-registration', component: BulkRegistration },
  { label: 'Registered Patients', slug: 'registered-patients', component: RegisteredPatients },
  { label: 'Sample Accessioning', slug: 'sample-accessioning', component: SampleAccessioning },
  { label: 'Rejected & Held Samples', slug: 'rejected-held-samples', component: RejectedHeldSamples },
  { label: 'Test Tracker', slug: 'test-tracker', component: TestTracker },
  { label: 'Result Entry', slug: 'result-entry', component: ResultEntry },
  { label: 'Approve Report', slug: 'approve-report', component: ApproveReport },
  { label: 'Critical Hold', slug: 'critical-hold', component: CriticalHold },
]

const quotationPages = [
  { label: 'Quotation Generator', slug: 'quotation-generator', component: QuotationGenerator },
  { label: 'Quotation Tracker', slug: 'quotation-tracker', component: QuotationTracker },
  { label: 'Quotation Follow-up', slug: 'quotation-follow-up', component: QuotationFollowUp },
]

const masterPages = [
  { label: 'User Master', slug: 'user-master', component: UserMaster },
  { label: 'Doctor Master', slug: 'doctor-master', component: DoctorMaster },
  { label: 'Test Master', slug: 'test-master', component: TestMaster },
  { label: 'Package Master', slug: 'package-master', component: PackageMaster },
  { label: 'Account Master', slug: 'account-master', component: AccountMaster },
  { label: 'Report Format Master', slug: 'report-format-master', component: ReportFormatMaster },
  { label: 'Flag Master', slug: 'flag-master', component: FlagMaster },
  { label: 'Bill Master', slug: 'bill-master', component: BillMaster },
  { label: 'Accounting Collection Master', slug: 'accounting-collection-master', component: AccountingCollectionMaster },
  { label: 'Lab Profile', slug: 'lab-profile', component: LabProfile },
]

const allPages = [...patientPages, ...quotationPages, ...masterPages]

function getPageFromHash() {
  const segments = window.location.hash.replace(/^#\/?/, '').split('/')
  const slug = segments.length > 1 ? segments.at(-1) : segments[0] || 'dashboard'
  return allPages.find((page) => page.slug === slug)?.slug ?? 'dashboard'
}

function Dashboard() {
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

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)
  const activePageInfo = allPages.find((item) => item.slug === activePage)
  const PageComponent = activePageInfo?.component
  const heading = activePageInfo?.label ?? 'Dashboard'

  useEffect(() => {
    const syncPage = () => setActivePage(getPageFromHash())
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return (
    <div className="min-h-screen min-w-80 bg-slate-50 font-sans text-slate-800 antialiased">
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

      <main className="ml-[220px] min-h-screen w-[calc(100%_-_220px)] max-[760px]:ml-[190px] max-[760px]:w-[calc(100%_-_190px)] max-[520px]:ml-[145px] max-[520px]:w-[calc(100%_-_145px)]">
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
              onChange={(event) => {
                const nextPage = event.target.value
                window.location.hash = nextPage === 'dashboard'
                  ? '/dashboard'
                  : quotationPages.some((item) => item.slug === nextPage)
                    ? `/${nextPage}`
                    : masterPages.some((item) => item.slug === nextPage)
                      ? `/master/${nextPage}`
                      : `/patient-management/${nextPage}`
              }}
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

        <div className="px-[19px] pt-[19px] pb-9 max-[760px]:px-[14px] max-[760px]:pt-[17px] max-[760px]:pb-7">
          {PageComponent ? <PageComponent /> : <Dashboard />}
        </div>
      </main>
    </div>
  )
}

export default App
