
export type Property = {
  id: string; name: string; image?: string;
  buildingNumber?: string; city?: string; state?: string; country?: string;
  ownerName?: string; listingType?: 'sale'|'rent';
}

const API = import.meta.env.VITE_PROPERTIES_API || 'https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing'

export async function fetchProperties(): Promise<Property[]>{
  const res = await fetch(API)
  if(!res.ok) throw new Error('Failed to fetch')
  return res.json()
}
