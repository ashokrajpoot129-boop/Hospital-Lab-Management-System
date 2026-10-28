import { useState, type FormEvent } from 'react'

export default function NewRegistration() {
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      patientName: data.get('patientName'), age: data.get('age'), mobileNumber: data.get('mobileNumber'),
      gender: data.get('gender'), referringDoctor: data.get('referringDoctor'), testsOrdered: data.get('testsOrdered'),
    }
    try {
      const response = await fetch('/api/patients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const saved = await response.json()
      if (!response.ok) throw new Error(saved.error || 'Unable to register patient')
      setMessage(`Patient registered successfully. Accession ID: ${saved.accession_id}`)
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to register patient')
    }
  }

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">New Registration</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Register a patient and create a new laboratory order.</p>
        </div>
      </div>
      <form className="rounded-xl border border-slate-200 bg-white p-[22px] shadow-sm max-[520px]:p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] max-[760px]:grid-cols-1">
          {['Patient name', 'Age', 'Mobile number', 'Gender', 'Referring doctor', 'Tests ordered'].map((field) => (
            <label className="flex flex-col gap-[7px] text-xs font-semibold text-slate-700" key={field}>
              <span>{field}</span>
              {field === 'Gender' ? (
                <select name="gender" className="min-h-[39px] w-full rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] font-normal text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" required defaultValue="">
                  <option value="" disabled>Select gender</option>
                  <option>Female</option><option>Male</option><option>Other</option>
                </select>
              ) : (
                <input
                  name={{ 'Patient name': 'patientName', Age: 'age', 'Mobile number': 'mobileNumber', 'Referring doctor': 'referringDoctor', 'Tests ordered': 'testsOrdered' }[field]}
                  className="min-h-[39px] w-full rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] font-normal text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required={field === 'Patient name'}
                  type={field === 'Age' ? 'number' : 'text'}
                  min={field === 'Age' ? 0 : undefined}
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-[22px] flex items-center justify-between gap-4 border-t border-slate-100 pt-[17px] max-[760px]:items-start max-[760px]:flex-col">
          <span className="text-[11px] leading-relaxed text-slate-500">Fields marked by your lab policy should be completed before submission.</span>
          <button className="min-h-[38px] rounded-[7px] border border-blue-700 bg-blue-600 px-[15px] text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" type="submit">Register patient</button>
        </div>
        {message && <p className="mt-3.5 text-xs text-green-800" role="status">{message}</p>}
      </form>
    </>
  )
}
