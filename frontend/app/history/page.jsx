"use client"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import AuthGuard from "../AuthGuard"

export default function History() {
  const [transcripts, setTranscripts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchTranscripts = async () => {
    try {
      const response = await fetch("/api/transcripts")
      const data = await response.json()
      setTranscripts(data.transcripts)
    } catch (err) {
      setError("Could not load transcripts. Make sure Flask is running!")
    } finally {
      setLoading(false)
    }
  }

  const deleteTranscript = async (id) => {
    try {
      await fetch(`/api/transcripts/${id}`, { method: "DELETE" })
      setTranscripts(transcripts.filter((t) => t.id !== id))
    } catch (err) {
      setError("Could not delete transcript.")
    }
  }

  const handleDownload = (text) => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
  }

  useEffect(() => {
    fetchTranscripts()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const wordCount = (text) => text.trim().split(/\s+/).length

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-700">
              📋 Transcript History
            </h2>
            <span className="text-sm text-gray-400">
              {transcripts.length} transcript{transcripts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-blue-500">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Loading transcripts...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!loading && transcripts.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <span className="text-4xl mb-4 block">🎙️</span>
              <p className="text-gray-400 italic">
                No transcripts yet. Start recording to see your history here!
              </p>
              <a href="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-200">
                Start Recording
              </a>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {transcripts.map((transcript) => (
              <div key={transcript.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-200">
                <p className="text-gray-700 leading-relaxed mb-3">
                  {transcript.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-gray-400">
                    <span>🕐 {formatDate(transcript.created_at)}</span>
                    <span>📝 {wordCount(transcript.text)} words</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigator.clipboard.writeText(transcript.text)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => handleDownload(transcript.text)}
                    className="bg-green-50 hover:bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    💾 Download
                  </button>
                  <button
                    onClick={() => deleteTranscript(transcript.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}