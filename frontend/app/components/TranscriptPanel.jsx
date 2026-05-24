export default function TranscriptPanel() {
  return (
    <div className="max-w-3xl mx-auto w-full px-6 pb-12">
      <div className="bg-white rounded-2xl shadow-md p-6 min-h-48">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Transcript
        </h2>
        <p className="text-gray-400 italic">
          Your transcript will appear here after recording...
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">
          Copy
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">
          Download
        </button>
      </div>
    </div>
  )
}