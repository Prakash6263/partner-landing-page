import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const companyName = formData.get('companyName') as string
    const ownerName = formData.get('ownerName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const logo = formData.get('logo') as File
    const profileImage = formData.get('profileImage') as File
    const websiteName = formData.get('websiteName') as string
    const gstNumber = formData.get('gstNumber') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const country = formData.get('country') as string

    // Validation
    if (!companyName || !ownerName || !email || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (!logo || !profileImage) {
      return NextResponse.json(
        { success: false, message: 'Logo and profile image are required' },
        { status: 400 }
      )
    }

    // Create a new FormData instance to send to backend
    const backendFormData = new FormData()
    backendFormData.append('companyName', companyName)
    backendFormData.append('ownerName', ownerName)
    backendFormData.append('email', email)
    backendFormData.append('phone', phone)
    backendFormData.append('password', password)
    backendFormData.append('confirmPassword', confirmPassword)
    backendFormData.append('logo', logo)
    backendFormData.append('profileImage', profileImage)
    backendFormData.append('websiteName', websiteName)
    backendFormData.append('gstNumber', gstNumber)
    backendFormData.append('city', city)
    backendFormData.append('state', state)
    backendFormData.append('country', country)

    // Call your backend API
    const backendResponse = await fetch('http://localhost:5000/api/partner/register', {
      method: 'POST',
      body: backendFormData,
    })

    const result = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Registration failed' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Partner registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
