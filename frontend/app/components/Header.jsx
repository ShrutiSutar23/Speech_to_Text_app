export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">🎙️ SpeechScribe</h1>
        <a href="/history" className="text-sm underline hover:text-blue-200">
          History
        </a>
      </div>
    </header>
  )
}