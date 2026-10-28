import { useState, type FormEvent } from 'react'

export default function BulkRegistration() {
  const [selectedFile, setSelectedFile] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('File selected for validation. Connect a backend import service to process registrations.')
  }

  return (
    <>
      <div className="mb-[18px] flex min-h-[38px] items-center gap-3">
        <span className="grid size-[33px] shrink-0 place-items-center border-2 border-slate-800 text-2xl leading-none text-green-700" aria-hidden="true">▤</span>
        <div>
          <h1 className="m-0 text-[29px] leading-tight font-bold tracking-[-0.6px] text-slate-800 max-[760px]:text-2xl max-[520px]:text-[21px]">Bulk Registration</h1>
          <p className="mt-[5px] text-[13px] leading-relaxed text-slate-500">Import multiple patient registrations from a spreadsheet.</p>
        </div>
      </div>
      <form className="rounded-xl border border-slate-200 bg-white p-[22px] shadow-sm max-[520px]:p-4" onSubmit={handleSubmit}>
        <label className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center gap-[9px] rounded-[10px] border border-dashed border-blue-200 bg-blue-50/50 text-slate-700 hover:border-blue-500 hover:bg-blue-50">
          <span className="text-[26px] text-blue-600" aria-hidden="true">⇧</span>
          <strong className="text-sm">Choose a registration file</strong>
          <span className="text-xs text-slate-500">CSV or Excel spreadsheet</span>
          <input className="max-w-[230px] text-[11px] text-slate-500" accept=".csv,.xls,.xlsx" type="file" onChange={(event) => {
            setSelectedFile(event.target.files?.[0]?.name ?? '')
            setMessage('')
          }} />
        </label>
        {selectedFile && <p className="mt-3 text-xs text-slate-700">Selected: {selectedFile}</p>}
        <div className="mt-[22px] flex items-center justify-between gap-4 border-t border-slate-100 pt-[17px] max-[760px]:items-start max-[760px]:flex-col">
          <span className="text-[11px] leading-relaxed text-slate-500">Files are not uploaded until a backend import service is connected.</span>
          <button className="min-h-[38px] rounded-[7px] border border-blue-700 bg-blue-600 px-[15px] text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-55" disabled={!selectedFile} type="submit">Validate file</button>
        </div>
        {message && <p className="mt-3.5 text-xs text-green-800" role="status">{message}</p>}
      </form>
    </>
  )
}
