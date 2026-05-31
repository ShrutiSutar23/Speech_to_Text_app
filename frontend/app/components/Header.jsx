export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎙️</span>
          <h1 className="text-2xl font-bold tracking-tight">SpeechScribe</h1>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm hover:text-blue-200 transition duration-200">
            Home
          </a>
          <a href="/history" className="bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition duration-200">
            History
          </a>
        </nav>
      </div>
    </header>
  )
}