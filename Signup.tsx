
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [err,setErr]=useState('')
  const nav = useNavigate()
  const onSubmit = async (e:React.FormEvent)=>{
    e.preventDefault(); setErr('')
    if(password!==confirm) return setErr('Passwords do not match')
    try{
      const cred = await createUserWithEmailAndPassword(auth,email,password)
      if(cred.user && name) await updateProfile(cred.user, { displayName: name })
      nav('/login')
    } catch(err:any){ setErr(err.message||'Signup failed') }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="text" placeholder="Full name" className="w-full rounded-md border px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm password" className="w-full rounded-md border px-3 py-2" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full rounded-md bg-black text-white px-4 py-2">Sign up</button>
      </form>
    </div>
  )
}
