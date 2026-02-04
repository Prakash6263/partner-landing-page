import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { registerPartner } from '../api/partnerService'

function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    websiteName: '',
    gstNumber: '',
    city: '',
    state: '',
    country: '',
    logo: null,
    profileImage: null,
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Valid email required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[+]?[0-9]{7,15}$/.test(formData.phone.replace(/\D/g, ''))) 
      newErrors.phone = 'Valid phone number required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password'
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.websiteName.trim()) newErrors.websiteName = 'Website name is required'
    if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST number is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.logo) newErrors.logo = 'Company logo is required'
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors above' })
      return
    }

    setIsLoading(true)
    setSubmitStatus(null)

    try {
      const result = await registerPartner(formData)
      console.log('[v0] Registration successful:', result)
      setSubmitStatus({ 
        type: 'success', 
        message: 'Registration submitted successfully! Please check your email to verify.' 
      })
      
      // Reset form
      setFormData({
        companyName: '',
        ownerName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        websiteName: '',
        gstNumber: '',
        city: '',
        state: '',
        country: '',
        logo: null,
        profileImage: null,
        agreeTerms: false,
      })
    } catch (error) {
      console.error('[v0] Registration error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit registration. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <section>
        <div className="container py-5">
          <div className="row">
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
              <div className="card form-card">
                <div className="card-header mb-4">
                  <h4 className="fw-bold">Partner Registration</h4>
                  <p className="text-muted">
                    Join as a service partner and grow your business
                  </p>
                </div>

                <div className="card-body">
                  {submitStatus && (
                    <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'} mb-4`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* COMPANY INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Company Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Company Name *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            required
                          />
                          {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Website Name *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.websiteName ? 'is-invalid' : ''}`}
                            name="websiteName"
                            value={formData.websiteName}
                            onChange={handleChange}
                            placeholder="e.g. prakash"
                            required
                          />
                          {errors.websiteName && <div className="invalid-feedback">{errors.websiteName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">GST Number *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.gstNumber ? 'is-invalid' : ''}`}
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                            placeholder="Enter GST number"
                            required
                          />
                          {errors.gstNumber && <div className="invalid-feedback">{errors.gstNumber}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Owner Name *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.ownerName ? 'is-invalid' : ''}`}
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            placeholder="Enter owner name"
                            required
                          />
                          {errors.ownerName && <div className="invalid-feedback">{errors.ownerName}</div>}
                        </div>
                      </div>
                    </div>

                    {/* CONTACT INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Contact Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Email Address *</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Phone Number *</label>
                          <input
                            type="tel"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1234567890"
                            required
                          />
                          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                      </div>
                    </div>

                    {/* PASSWORD INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Security Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Password *</label>
                          <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                          />
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Confirm Password *</label>
                          <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                          />
                          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                      <div className="section-title">Business Location</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. indore"
                            required
                          />
                          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="e.g. madhya pradesh"
                            required
                          />
                          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Country *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="e.g. india"
                            required
                          />
                          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENT UPLOAD */}
                    <div className="mb-4">
                      <div className="section-title">Upload Documents</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Company Logo *</label>
                          <input
                            type="file"
                            className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                            name="logo"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                          />
                          {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
                          <small className="text-muted">Recommended size: 500x500px</small>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Profile Image *</label>
                          <input
                            type="file"
                            className={`form-control ${errors.profileImage ? 'is-invalid' : ''}`}
                            name="profileImage"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                          />
                          {errors.profileImage && <div className="invalid-feedback">{errors.profileImage}</div>}
                          <small className="text-muted">Recommended size: 400x400px</small>
                        </div>
                      </div>
                    </div>

                    {/* TERMS */}
                    <div
                      style={{
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <input
                        className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                        type="checkbox"
                        name="agreeTerms"
                        id="terms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="terms" className="form-check-label ms-2">
                        I agree to the Terms & Conditions and Privacy Policy
                      </label>
                      {errors.agreeTerms && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.agreeTerms}</div>}
                    </div>

                    {/* SUBMIT */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5 rounded-pill"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Submitting...' : 'Submit Registration'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PartnerRegisterPage
