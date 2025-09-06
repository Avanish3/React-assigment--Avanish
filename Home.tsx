
import React, { useEffect, useState } from 'react'
import { fetchProperties, Property } from '../services/api'
import PropertyCard from '../components/PropertyCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const [props, setProps] = useState<Property[]>([])
  useEffect(()=>{ fetchProperties().then(d=>setProps(d)).catch(()=>setProps([])) },[])
  const featured = props.slice(0,6)
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
        <h1 className="text-3xl md:text-4xl font-bold">Find your next home</h1>
        <p className="mt-2 text-gray-200 max-w-2xl">Browse verified listings for sale and rent — sign up to save favorites.</p>
        <div className="mt-4">
          <Link to="/listings" className="px-4 py-2 rounded-xl bg-white text-gray-900">Browse Listings</Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">Featured Properties</h2>
          <Link to="/listings" className="text-sm underline">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(p=> <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  )
}
