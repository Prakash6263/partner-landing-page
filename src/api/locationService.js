// Location API Service
const API_BASE_URL = 'http://localhost:5000/api/location'

// Helper to safely extract backend "data"
const extractData = (res) => {
  if (!res || !res.data) return []
  return res.data
}

export const getCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    console.log('[v1] getCountries raw:', json)

    // Backend format:
    // { success: true, data: [ "India", "USA", ... ] }
    const list = extractData(json)

    if (Array.isArray(list)) {
      return list.filter(Boolean)
    }

    return []
  } catch (error) {
    console.error('[v1] getCountries error:', error)
    return []
  }
}

export const getStates = async (country) => {
  try {
    console.log('[v1] getStates country:', country)

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

    const json = await response.json()
    console.log('[v1] getStates raw:', json)

    // Backend format:
    // {
    //   success: true,
    //   data: [ "IN", "IND", "India", [ { name, state_code } ] ]
    // }
    const raw = extractData(json)

    if (Array.isArray(raw) && Array.isArray(raw[3])) {
      return raw[3].map(s => s.name).filter(Boolean)
    }

    return []
  } catch (error) {
    console.error('[v1] getStates error:', error)
    return []
  }
}

export const getCities = async (country, state) => {
  try {
    console.log('[v1] getCities:', { country, state })

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

    const json = await response.json()
    console.log('[v1] getCities raw:', json)

    // Backend format:
    // { success: true, data: ["Delhi"] }
    const list = extractData(json)

    if (Array.isArray(list)) {
      return list.filter(Boolean)
    }

    return []
  } catch (error) {
    console.error('[v1] getCities error:', error)
    return []
  }
}
