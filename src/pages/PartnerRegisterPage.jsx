import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    serviceCategory: '',
    yearsOfExperience: '',
    businessRegistrationNo: '',
    ownerName: '',
    mobileNumber: '',
    email: '',
    alternateContact: '',
    fullAddress: '',
    city: '',
    state: '',
    pincode: '',
    serviceArea: '',
    workingDays: 'Monday - Friday',
    openingTime: '',
    closingTime: '',
    idProof: null,
    license: null,
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!formData.serviceCategory) newErrors.serviceCategory = 'Service category is required'
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required'
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required'
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) 
      newErrors.mobileNumber = 'Valid 10-digit mobile number required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Valid email required'
    if (!formData.fullAddress.trim()) newErrors.fullAddress = 'Full address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode required'
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
      const formDataToSend = new FormData()
      Object.keys(formData).forEach((key) => {
        if (key === 'idProof' || key === 'license') {
          if (formData[key]) formDataToSend.append(key, formData[key])
        } else {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await fetch('https://api.partnerregistration.com/register', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const result = await response.json()
      setSubmitStatus({ type: 'success', message: 'Registration submitted successfully!' })
      setFormData({
        businessName: '',
        serviceCategory: '',
        yearsOfExperience: '',
        businessRegistrationNo: '',
        ownerName: '',
        mobileNumber: '',
        email: '',
        alternateContact: '',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        serviceArea: '',
        workingDays: 'Monday - Friday',
        openingTime: '',
        closingTime: '',
        idProof: null,
        license: null,
        agreeTerms: false,
      })
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to submit registration. Please try again.' })
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
                    {/* BUSINESS INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Business Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Business Name *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.businessName ? 'is-invalid' : ''}`}
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Enter business name"
                            required
                          />
                          {errors.businessName && <div className="invalid-feedback">{errors.businessName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Service Category *</label>
                          <select
                            className={`form-select ${errors.serviceCategory ? 'is-invalid' : ''}`}
                            name="serviceCategory"
                            value={formData.serviceCategory}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Service</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Barber / Salon">Barber / Salon</option>
                            <option value="Gym">Gym</option>
                          </select>
                          {errors.serviceCategory && <div className="invalid-feedback">{errors.serviceCategory}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Years of Experience</label>
                          <input
                            type="number"
                            className="form-control"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Business Registration No.
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="businessRegistrationNo"
                            value={formData.businessRegistrationNo}
                            onChange={handleChange}
                            placeholder="GST / License No."
                          />
                        </div>
                      </div>
                    </div>

                    {/* CONTACT INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Contact Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Owner Name *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.ownerName ? 'is-invalid' : ''}`}
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                          />
                          {errors.ownerName && <div className="invalid-feedback">{errors.ownerName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Mobile Number *</label>
                          <input
                            type="tel"
                            className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                          />
                          {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Email Address *</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Alternate Contact
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            name="alternateContact"
                            value={formData.alternateContact}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                      <div className="section-title">Business Address</div>

                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Full Address *</label>
                          <textarea
                            className={`form-control ${errors.fullAddress ? 'is-invalid' : ''}`}
                            name="fullAddress"
                            rows="2"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            required
                          />
                          {errors.fullAddress && <div className="invalid-feedback">{errors.fullAddress}</div>}
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Pincode *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                          />
                          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                        </div>
                      </div>
                    </div>

                    {/* SERVICE DETAILS */}
                    <div className="mb-4">
                      <div className="section-title">Service Details</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Service Area (Radius / Locations)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="serviceArea"
                            value={formData.serviceArea}
                            onChange={handleChange}
                            placeholder="e.g. 10 km / City-wide"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Working Days</label>
                          <select
                            className="form-select"
                            name="workingDays"
                            value={formData.workingDays}
                            onChange={handleChange}
                          >
                            <option value="Monday - Friday">
                              Monday - Friday
                            </option>
                            <option value="Monday - Saturday">
                              Monday - Saturday
                            </option>
                            <option value="All Days">All Days</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Opening Time</label>
                          <input
                            type="time"
                            className="form-control"
                            name="openingTime"
                            value={formData.openingTime}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Closing Time</label>
                          <input
                            type="time"
                            className="form-control"
                            name="closingTime"
                            value={formData.closingTime}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENT UPLOAD */}
                    <div className="mb-4">
                      <div className="section-title">Documents</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Upload ID Proof
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="idProof"
                            onChange={handleFileChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Upload License / Certificate
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="license"
                            onChange={handleFileChange}
                          />
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
                      <label htmlFor="terms" className="form-check-label">
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
