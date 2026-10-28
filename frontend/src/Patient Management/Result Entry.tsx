import { useState, type FormEvent } from 'react'

export default function ResultEntry() {
  const [message, setMessage] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Preview only. Connect the backend to save result drafts.')
  }
  const fields = ['Patient / accession ID', 'Test name', 'Result', 'Unit', 'Reference range', 'Remarks']
  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div><h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Result Entry</h1><p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Enter test results for an accessioned sample.</p></div>
      </div>
      <form className="rounded-xl border border-slate-200 bg-white p-[22px] shadow-sm max-[520px]:p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] max-[760px]:grid-cols-1">
          {fields.map((field) => <label className="flex flex-col gap-[7px] text-xs font-semibold text-slate-700" key={field}>
            <span>{field}</span>
            {field === 'Remarks'
              ? <textarea className="min-h-[39px] w-full resize-y rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] font-normal text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" rows={3} placeholder="Enter remarks" />
              : <input className="min-h-[39px] w-full rounded-[7px] border border-slate-300 bg-white px-[11px] py-[9px] text-[13px] font-normal text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" required={field === 'Patient / accession ID' || field === 'Test name' || field === 'Result'} placeholder={`Enter ${field.toLowerCase()}`} />}
          </label>)}
        </div>
        <div className="mt-[22px] flex items-center justify-between gap-4 border-t border-slate-100 pt-[17px] max-[760px]:items-start max-[760px]:flex-col">
          <span className="text-[11px] leading-relaxed text-slate-500">Review entries before submitting them for approval.</span>
          <button className="min-h-[38px] rounded-[7px] border border-blue-700 bg-blue-600 px-[15px] text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" type="submit">Save draft results</button>
        </div>
        {message && <p className="mt-3.5 text-xs text-green-800" role="status">{message}</p>}
      </form>
    </>
  )
}
