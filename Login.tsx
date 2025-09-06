
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('')
  const nav = useNavigate()
  const onSubmit = async (e:React.FormEvent)=>{
    e.preventDefault(); setErr('')
    try{ await signInWithEmailAndPassword(auth,email,password); nav('/') } catch(err:any){ setErr(err.message||'Login failed') }
  }
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full rounded-md bg-black text-white px-4 py-2">Login</button>
      </form>
    </div>
  )
}
