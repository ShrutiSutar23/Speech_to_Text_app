"use client"
import { useState, useRef } from "react"

export default function RecorderPanel({ onTranscript }) {
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [audioURL, setAudioURL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)

  const startRecording = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setIsLoading(true)
        try {
          const formData = new FormData()
          formData.append("file", blob, "recording.webm")
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData
          })
          const data = await response.json()
          if (data.transcript) {
            if (typeof onTranscript === "function") {
              onTranscript(data.transcript)
            }
          } else if (data.error) {
            setError(`Server error: ${data.error}`)
          } else if (!response.ok) {
            setError(`Server returned status ${response.status}`)
          } else {
            setError("No transcript received. Please try again.")
          }
        } catch (err) {
          setError("Could not connect to server. Make sure Flask is running!")
        } finally {
          setIsLoading(false)
        }
      }
      mediaRecorder.start()
      setIsRecording(true)
      setTimer(0)
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      setError("Microphone access denied. Please allow microphone permission!")
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setIsRecording(false)
    clearInterval(timerRef.current)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg ${isRecording ? "bg-red-100 animate-pulse" : "bg-blue-100"}`}>
        <span className="text-6xl">🎙️</span>
      </div>

      {isRecording && (
        <p className="text-red-500 font-semibold text-lg">
          Recording... {timer}s
        </p>
      )}

      {isLoading && (
        <div className="flex items-center gap-2 text-blue-500 font-semibold">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Transcribing your audio...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm max-w-md text-center">
          {error}
        </div>
      )}

      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
        className={`text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-200 ${isLoading ? "bg-gray-400 cursor-not-allowed" : isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isLoading ? "Processing..." : isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <p className="text-gray-400 text-sm">
        Press the button and start speaking...
      </p>

      {audioURL && !isLoading && (
        <div className="flex flex-col items-center gap-3">
          <audio controls src={audioURL} className="mt-2" />
          <a href={audioURL} download="recording.webm" className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">
            Download Recording
          </a>
        </div>
      )}
    </div>
  )
}