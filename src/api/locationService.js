// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

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
    console.log('[v0] Countries raw data:', data)
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.countries || data.data || [])
    
    // Extract names from objects if they have 'name' property
    result = result.map(item => typeof item === 'string' ? item : (item.name || item))
    
    console.log('[v0] Countries processed:', result)
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
    console.log('[v0] States raw data:', data)
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.states || data.data || [])
    
    // Extract names from objects if they have 'name' property
    result = result.map(item => typeof item === 'string' ? item : (item.name || item))
    
    console.log('[v0] States processed:', result)
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
    console.log('[v0] Cities raw data:', data)
    
    // Handle different API response formats
    let result = Array.isArray(data) ? data : (data.cities || data.data || [])
    
    // Extract names from objects if they have 'name' property
    result = result.map(item => typeof item === 'string' ? item : (item.name || item))
    
    console.log('[v0] Cities processed:', result)
    return result
  } catch (error) {
    console.error('[v0] Error fetching cities:', error.message)
    throw new Error('Failed to fetch cities: ' + error.message)
  }
}
