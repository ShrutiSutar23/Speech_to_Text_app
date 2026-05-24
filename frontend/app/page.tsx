import Header from "./components/Header"
import RecorderPanel from "./components/RecorderPanel"
import TranscriptPanel from "./components/TranscriptPanel"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <RecorderPanel />
      <TranscriptPanel />
    </main>
  )
}