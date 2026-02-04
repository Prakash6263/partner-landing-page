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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Registration submitted! (This is a demo)')
  }

  return (
    <div>
      <Navbar />

      <section >
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
                  <form onSubmit={handleSubmit}>
                    {/* BUSINESS INFORMATION */}
                    <div className="mb-4">
                      <div className="section-title">Business Information</div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Business Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Enter business name"
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Service Category *</label>
                          <select
                            className="form-select"
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
                            className="form-control"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Mobile Number *</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Email Address *</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
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
                            className="form-control"
                            name="fullAddress"
                            rows="2"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Pincode *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                          />
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
                        className="form-check-input"
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
                    </div>

                    {/* SUBMIT */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5 rounded-pill"
                      >
                        Submit Registration
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
