// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

export const getCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('[v0] Countries raw response:', data)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(data)) {
      const countries = data
        .filter(item => item && item.name) // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] Countries extracted:', countries)
      return countries
    }
    
    return []
  } catch (error) {
    console.error('[v0] Error fetching countries:', error)
    throw new Error('Failed to fetch countries: ' + error.message)
  }
}

export const getStates = async (country) => {
  try {
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
    console.log('[v0] States raw response:', data)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(data)) {
      const states = data
        .filter(item => item && item.name)  // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] States extracted:', states)
      return states
    }
    
    return []
  } catch (error) {
    console.error('[v0] Error fetching states:', error)
    throw new Error('Failed to fetch states: ' + error.message)
  }
}

export const getCities = async (country, state) => {
  try {
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
    console.log('[v0] Cities raw response:', data)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(data)) {
      const cities = data
        .filter(item => item && item.name)  // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] Cities extracted:', cities)
      return cities
    }
    
    return []
  } catch (error) {
    console.error('[v0] Error fetching cities:', error)
    throw new Error('Failed to fetch cities: ' + error.message)
  }
}
