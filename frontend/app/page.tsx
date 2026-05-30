"use client"

import { useState } from "react"
import Header from "./components/Header"
import RecorderPanel from "./components/RecorderPanel"
import TranscriptPanel from "./components/TranscriptPanel"

export default function Home() {
  const [transcript, setTranscript] = useState("")

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <RecorderPanel onTranscript={setTranscript} />
      <TranscriptPanel transcript={transcript} />
    </main>
  )
}