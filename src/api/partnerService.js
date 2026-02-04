const API_BASE_URL = 'http://localhost:5000/api'

export const registerPartner = async (formData) => {
  try {
    const form = new FormData()

    // Append all form fields
    form.append('companyName', formData.companyName)
    form.append('ownerName', formData.ownerName)
    form.append('email', formData.email)
    form.append('phone', formData.phone)
    form.append('password', formData.password)
    form.append('confirmPassword', formData.confirmPassword)
    form.append('websiteName', formData.websiteName)
    form.append('gstNumber', formData.gstNumber)
    form.append('city', formData.city)
    form.append('state', formData.state)
    form.append('country', formData.country)

    // Append file uploads
    if (formData.logo) {
      form.append('logo', formData.logo)
    }
    if (formData.profileImage) {
      form.append('profileImage', formData.profileImage)
    }

    const response = await fetch(`${API_BASE_URL}/partner/register`, {
      method: 'POST',
      body: form,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return data
  } catch (error) {
    console.error('Partner registration error:', error)
    throw error
  }
}
