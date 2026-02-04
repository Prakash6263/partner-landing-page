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
      throw new Error('Failed to fetch countries')
    }

    const data = await response.json()
    console.log('[v0] Countries fetched:', data)
    return data.countries || data.data || []
  } catch (error) {
    console.error('[v0] Error fetching countries:', error)
    throw error
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
      throw new Error('Failed to fetch states')
    }

    const data = await response.json()
    console.log('[v0] States fetched:', data)
    return data.states || data.data || []
  } catch (error) {
    console.error('[v0] Error fetching states:', error)
    throw error
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
      throw new Error('Failed to fetch cities')
    }

    const data = await response.json()
    console.log('[v0] Cities fetched:', data)
    return data.cities || data.data || []
  } catch (error) {
    console.error('[v0] Error fetching cities:', error)
    throw error
  }
}
