
import React from 'react'
import { Property } from '../services/api'

export default function PropertyCard({ p }: { p: Property }){
  return (
    <div className="rounded-2xl border overflow-hidden bg-white shadow-sm">
      {p.image && <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{p.name}</h3>
        <p className="text-sm text-gray-600">{[p.buildingNumber, p.city, p.state, p.country].filter(Boolean).join(', ')}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs rounded-full px-2 py-1 border">{p.listingType ?? 'N/A'}</span>
          <span className="text-xs text-gray-500">{p.ownerName}</span>
        </div>
      </div>
    </div>
  )
}
