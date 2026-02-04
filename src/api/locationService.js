// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

// Helper function to safely extract names from items
const extractNames = (items) => {
  console.log('[v0] extractNames input:', items, 'type:', typeof items)
  
  if (!Array.isArray(items)) {
    console.warn('[v0] Items is not an array:', items)
    return []
  }
  
  const extracted = items.map((item, index) => {
    console.log(`[v0] Processing item ${index}:`, item, 'typeof:', typeof item)
    
    if (typeof item === 'string') {
      return item
    }
    
    if (typeof item === 'object' && item !== null && item.name) {
      console.log(`[v0] Extracted name from object: ${item.name}`)
      return String(item.name)
    }
    
    console.warn(`[v0] Could not extract name from item ${index}:`, item)
    return String(item)
  })
  
  console.log('[v0] extractNames output:', extracted)
  return extracted
}

export const getCountries = async () => {
  try {
    console.log('[v0] Fetching countries from:', `${API_BASE_URL}/countries`)
    const response = await fetch(`${API_BASE_URL}/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('[v0] Countries response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] Countries raw data:', JSON.stringify(data, null, 2))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.countries || data.data || [])
    console.log('[v0] Countries array extracted:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] Countries final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching countries:', error.message)
    throw new Error('Failed to fetch countries: ' + error.message)
  }
}

export const getStates = async (country) => {
  try {
    console.log('[v0] Fetching states for country:', country)
    const response = await fetch(`${API_BASE_URL}/states`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country }),
    })

    console.log('[v0] States response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] States raw data:', JSON.stringify(data, null, 2))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.states || data.data || [])
    console.log('[v0] States array extracted:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] States final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching states:', error.message)
    throw new Error('Failed to fetch states: ' + error.message)
  }
}

export const getCities = async (country, state) => {
  try {
    console.log('[v0] Fetching cities for country:', country, 'state:', state)
    const response = await fetch(`${API_BASE_URL}/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, state }),
    })

    console.log('[v0] Cities response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] Cities raw data:', JSON.stringify(data, null, 2))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.cities || data.data || [])
    console.log('[v0] Cities array extracted:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] Cities final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching cities:', error.message)
    throw new Error('Failed to fetch cities: ' + error.message)
  }
}
