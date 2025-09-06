
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './context/AuthContext'

export default function App(){
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">PropertyApp</Link>
          <nav className="flex items-center gap-4">
            <Link to="/listings" className="hover:underline">Listings</Link>
            {user ? (
              <span className="text-sm">Hi, {user.displayName ?? user.email}</span>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 rounded-md border">Login</Link>
                <Link to="/signup" className="px-3 py-1.5 rounded-md bg-black text-white">Signup</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </main>

      <footer className="w-full border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} PropertyApp</p>
          <p>Built for ReactJS Frontend Assignment — Avanish Kumar (BEB - 223)</p>
        </div>
      </footer>
    </div>
  )
}
