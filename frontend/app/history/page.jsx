"use client"
import { useState, useEffect } from "react"
import Header from "../components/Header"

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
      await fetch(`/api/transcripts/${id}`, {
        method: "DELETE"
      })
      setTranscripts(transcripts.filter((t) => t.id !== id))
    } catch (err) {
      setError("Could not delete transcript.")
    }
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

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Transcript History
        </h2>

        {loading && (
          <p className="text-gray-400 italic">Loading transcripts...</p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!loading && transcripts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-400 italic">
              No transcripts yet. Start recording to see your history here!
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {transcripts.map((transcript) => (
            <div key={transcript.id} className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                {transcript.text}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                {formatDate(transcript.created_at)}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(transcript.text)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteTranscript(transcript.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}