"use client"
import { useState, useRef } from "react"

export default function RecorderPanel() {
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [audioURL, setAudioURL] = useState(null)
  const [transcript, setTranscript] = useState("")
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)

  const startRecording = async () => {
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
      const formData = new FormData()
      formData.append("file", blob, "recording.webm")
      const response = await fetch("http://127.0.0.1:5000/transcribe", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      setTranscript(data.transcript)
    }
    mediaRecorder.start()
    setIsRecording(true)
    setTimer(0)
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
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

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-200 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <p className="text-gray-400 text-sm">
        Press the button and start speaking...
      </p>

      {transcript && (
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-md p-6 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Transcript</h2>
          <p className="text-gray-600">{transcript}</p>
        </div>
      )}

      {audioURL && (
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