// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

export const getCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] getCountries raw response:', data, 'type:', typeof data, 'isArray:', Array.isArray(data))
    
    // Response is directly an array of objects with { name, code } structure
    if (Array.isArray(data) && data.length > 0) {
      const countries = data.map(item => {
        console.log('[v0] Country item:', item)
        return item.name || item
      }).filter(Boolean)
      console.log('[v0] Extracted countries:', countries)
      return countries
    }
    
    console.warn('[v0] getCountries returned no data:', data)
    return []
  } catch (error) {
    console.error('[v0] Error in getCountries:', error)
    throw error
  }
}

export const getStates = async (country) => {
  try {
    console.log('[v0] getStates called with country:', country)
    const response = await fetch(`${API_BASE_URL}/states`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] getStates raw response:', data, 'type:', typeof data, 'isArray:', Array.isArray(data))
    
    // Response is directly an array of objects with { name } structure
    if (Array.isArray(data) && data.length > 0) {
      const states = data.map(item => {
        console.log('[v0] State item:', item)
        return item.name || item
      }).filter(Boolean)
      console.log('[v0] Extracted states:', states)
      return states
    }
    
    console.warn('[v0] getStates returned no data:', data)
    return []
  } catch (error) {
    console.error('[v0] Error in getStates:', error)
    throw error
  }
}

export const getCities = async (country, state) => {
  try {
    console.log('[v0] getCities called with country:', country, 'state:', state)
    const response = await fetch(`${API_BASE_URL}/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, state }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] getCities raw response:', data, 'type:', typeof data, 'isArray:', Array.isArray(data))
    
    // Response is directly an array of objects with { name } structure
    if (Array.isArray(data) && data.length > 0) {
      const cities = data.map(item => {
        console.log('[v0] City item:', item)
        return item.name || item
      }).filter(Boolean)
      console.log('[v0] Extracted cities:', cities)
      return cities
    }
    
    console.warn('[v0] getCities returned no data:', data)
    return []
  } catch (error) {
    console.error('[v0] Error in getCities:', error)
    throw error
  }
}
