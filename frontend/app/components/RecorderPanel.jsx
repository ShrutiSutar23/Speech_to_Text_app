export default function RecorderPanel() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
        <span className="text-6xl">🎙️</span>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-200">
        Start Recording
      </button>

      <p className="text-gray-400 text-sm">
        Press the button and start speaking...
      </p>
    </div>
  )
}