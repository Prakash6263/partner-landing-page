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
    
    // Handle different response formats
    let dataArray = data
    if (!Array.isArray(data)) {
      // Try to extract array from wrapper object
      dataArray = data.countries || data.data || data.list || []
    }
    
    console.log('[v0] Countries data array:', dataArray)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(dataArray)) {
      const countries = dataArray
        .filter(item => item && item.name) // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] Countries extracted:', countries)
      return countries
    }
    
    console.warn('[v0] Countries data is not an array:', dataArray)
    return []
  } catch (error) {
    console.error('[v0] Error fetching countries:', error)
    throw new Error('Failed to fetch countries: ' + error.message)
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
    console.log('[v0] States raw response:', data)
    
    // Handle different response formats
    let dataArray = data
    if (!Array.isArray(data)) {
      // Try to extract array from wrapper object
      dataArray = data.states || data.data || data.list || []
    }
    
    console.log('[v0] States data array:', dataArray)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(dataArray)) {
      const states = dataArray
        .filter(item => item && item.name)  // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] States extracted:', states)
      return states
    }
    
    console.warn('[v0] States data is not an array:', dataArray)
    return []
  } catch (error) {
    console.error('[v0] Error fetching states:', error)
    throw new Error('Failed to fetch states: ' + error.message)
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
    console.log('[v0] Cities raw response:', data)
    
    // Handle different response formats
    let dataArray = data
    if (!Array.isArray(data)) {
      // Try to extract array from wrapper object
      dataArray = data.cities || data.data || data.list || []
    }
    
    console.log('[v0] Cities data array:', dataArray)
    
    // API returns array of objects with 'name' property
    if (Array.isArray(dataArray)) {
      const cities = dataArray
        .filter(item => item && item.name)  // Only include items with name property
        .map(item => item.name)             // Extract only the name string
      console.log('[v0] Cities extracted:', cities)
      return cities
    }
    
    console.warn('[v0] Cities data is not an array:', dataArray)
    return []
  } catch (error) {
    console.error('[v0] Error fetching cities:', error)
    throw new Error('Failed to fetch cities: ' + error.message)
  }
}
