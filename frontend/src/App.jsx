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
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'

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
      <Sidebar
        activePage={activePage}
        patientPages={patientPages}
        quotationPages={quotationPages}
        masterPages={masterPages}
      />

      <main className="ml-[220px] min-h-screen w-[calc(100%_-_220px)] max-[760px]:ml-[190px] max-[760px]:w-[calc(100%_-_190px)] max-[520px]:ml-[145px] max-[520px]:w-[calc(100%_-_145px)]">
        <Header
          heading={heading}
          patientPages={patientPages}
          quotationPages={quotationPages}
          masterPages={masterPages}
        />

        <div className="px-[19px] pt-[19px] pb-9 max-[760px]:px-[14px] max-[760px]:pt-[17px] max-[760px]:pb-7">
          {PageComponent ? <PageComponent /> : <Dashboard />}
        </div>
      </main>
    </div>
  )
}

export default App
