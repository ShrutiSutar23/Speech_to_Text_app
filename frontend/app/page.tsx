"use client"
import { useState } from "react"
import Header from "./components/Header"
import RecorderPanel from "./components/RecorderPanel"
import TranscriptPanel from "./components/TranscriptPanel"
import AuthGuard from "./AuthGuard"

export default function Home() {
  const [transcript, setTranscript] = useState("")

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50">
        <Header />
        <RecorderPanel onTranscript={setTranscript} />
        <TranscriptPanel transcript={transcript} />
      </main>
    </AuthGuard>
  )
}