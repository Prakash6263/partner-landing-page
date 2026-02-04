// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

// Helper function to safely extract names from items - handles various object formats
const extractNames = (items) => {
  console.log('[v0] extractNames input:', items, 'type:', typeof items)
  
  if (!Array.isArray(items)) {
    console.warn('[v0] Items is not an array, trying to convert:', items)
    if (typeof items === 'object' && items !== null) {
      return [items.name || String(items)]
    }
    return []
  }
  
  const extracted = items.map((item, index) => {
    console.log(`[v0] Processing item ${index}:`, item, 'typeof:', typeof item)
    
    if (typeof item === 'string') {
      console.log(`[v0] Item ${index} is string:`, item)
      return item
    }
    
    if (typeof item === 'object' && item !== null) {
      // Try multiple possible name fields
      const name = item.name || item.Name || item.title || item.state_name || item.city_name || item.countryName
      if (name) {
        console.log(`[v0] Extracted from object ${index}:`, name)
        return String(name)
      }
      
      console.warn(`[v0] Object ${index} has no recognizable name field:`, Object.keys(item))
      return String(item)
    }
    
    console.warn(`[v0] Unable to process item ${index}:`, item)
    return String(item)
  })
  
  // Filter out [object Object] strings and empty strings
  const filtered = extracted.filter(item => item && item !== '[object Object]')
  
  console.log('[v0] extractNames output:', filtered)
  return filtered
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
    console.log('[v0] Countries raw data type:', typeof data, 'isArray:', Array.isArray(data))
    console.log('[v0] Countries raw data:', JSON.stringify(data).substring(0, 500))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.countries || data.data || data)
    console.log('[v0] Countries before extraction:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] Countries final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching countries:', error.message, error)
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
    console.log('[v0] States raw data type:', typeof data, 'isArray:', Array.isArray(data))
    console.log('[v0] States raw data:', JSON.stringify(data).substring(0, 500))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.states || data.data || data)
    console.log('[v0] States before extraction:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] States final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching states:', error.message, error)
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
    console.log('[v0] Cities raw data type:', typeof data, 'isArray:', Array.isArray(data))
    console.log('[v0] Cities raw data:', JSON.stringify(data).substring(0, 500))
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.cities || data.data || data)
    console.log('[v0] Cities before extraction:', result)
    
    // Extract names from objects
    result = extractNames(result)
    
    console.log('[v0] Cities final result:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching cities:', error.message, error)
    throw new Error('Failed to fetch cities: ' + error.message)
  }
}
