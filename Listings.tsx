
import React, { useEffect, useMemo, useState } from 'react'
import { fetchProperties, Property } from '../services/api'
import PropertyCard from '../components/PropertyCard'

export default function Listings(){
  const [items, setItems] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all'|'sale'|'rent'>('all')
  const [q, setQ] = useState('')

  useEffect(()=>{
    fetchProperties().then(d=>setItems(d)).finally(()=>setLoading(false))
  },[])

  const filtered = useMemo(()=> items.filter(p=>{
    const matchesType = filter==='all' ? true : (p.listingType ?? '').toLowerCase()===filter
    const matchesQ = q ? JSON.stringify(p).toLowerCase().includes(q.toLowerCase()) : True
    return matchesType && matchesQ
  }), [items, filter, q])

  if(loading) return <div className="py-12 text-center">Loading listings...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Property Listings</h1>
      <div className="flex gap-2 items-center">
        {(['all','sale','rent'] as const).map(t=> (
          <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1 rounded-md border ${filter===t ? 'bg-black text-white' : ''}`}>{t[0].toUpperCase()+t.slice(1)}</button>
        ))}
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city, owner, etc." className="ml-auto rounded-md border px-3 py-2 w-full max-w-sm" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p=> <PropertyCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
