import Header from "../components/Header"

export default function History() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          📋 Transcript History
        </h2>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-400 italic">
            No transcripts yet. Start recording to see your history here!
          </p>
        </div>
      </div>
    </main>
  )
}