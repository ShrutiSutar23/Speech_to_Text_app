"use client"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { useRouter } from "next/navigation"

export default function Header() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      console.log("Session:", data.session)
      setUser(data.session?.user ?? null)
    }
    checkSession()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎙️</span>
          <h1 className="text-2xl font-bold tracking-tight">SpeechScribe</h1>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm hover:text-blue-200">Home</a>
          <a href="/history" className="text-sm hover:text-blue-200">History</a>
          {user ? (
            <button onClick={handleSignOut} className="bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
              Sign Out
            </button>
          ) : (
            <a href="/login" className="bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
              Sign In
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}