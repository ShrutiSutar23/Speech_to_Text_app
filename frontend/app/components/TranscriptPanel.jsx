"use client"
import { useState } from "react"

export default function TranscriptPanel({ transcript }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-6 pb-12">
      <div className="bg-white rounded-2xl shadow-md p-6 min-h-48">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Transcript
        </h2>
        {transcript ? (
          <p className="text-gray-700 leading-relaxed">{transcript}</p>
        ) : (
          <p className="text-gray-400 italic">
            Your transcript will appear here after recording...
          </p>
        )}
      </div>

      {transcript && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
          >
            Download .txt
          </button>
        </div>
      )}
    </div>
  )
}