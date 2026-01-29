import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const services = [
  {
    id: 1,
    name: 'Doctor',
    count: '80+',
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg',
  },
  {
    id: 2,
    name: 'Plumber',
    count: '99+',
    image:
      'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Gym',
    count: '34+',
    image: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg',
  },
  {
    id: 4,
    name: 'Cleaning',
    count: '98+',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Electrical',
    count: '67+',
    image: 'https://placehold.co/600x400?text=Electrical+Service',
  },
  {
    id: 6,
    name: 'Barber',
    count: '32+',
    image:
      'https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?auto=format&fit=crop&w=800&q=80',
  },
]

function HomePage() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="hero" style={{ marginTop: '60px' }}>
        <div className="container text-center">
          <h1 className="display-5 fw-semibold mb-3">
            Trusted Service Partners
          </h1>
          <p className="lead mb-4">
            Doctors, Plumbers, Electricians, Cleaners & more — all in one place
          </p>
          <Link
            to="/partner-register"
            className="btn btn-primary btn-lg rounded-pill px-5"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Popular Services</h2>
            <p className="text-muted">
              Choose a service and book instantly
            </p>
          </div>

          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div className="service-card">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.name} Service`}
                  />
                  <div className="p-4 text-center">
                    <h5>{service.name}</h5>
                    <p className="text-muted">
                      {service.count} {service.name}s Available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">All Services We Provide</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-calendar-check fs-1 text-primary"></i>
                <h5 className="mt-3">Smart Booking</h5>
                <p className="text-muted">
                  Real-time availability & confirmation
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-credit-card fs-1 text-primary"></i>
                <h5 className="mt-3">Secure Payments</h5>
                <p className="text-muted">
                  Online & offline payment support
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-bar-chart fs-1 text-primary"></i>
                <h5 className="mt-3">Reports & Insights</h5>
                <p className="text-muted">
                  Track bookings, revenue & growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Bootstrap Native Behavior) */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Frequently Asked Questions</h2>
          </div>

          <div className="accordion" id="faq">
            {[
              {
                id: 'q1',
                q: 'How do I book an appointment?',
                a: 'Select a service, provider, and time slot.',
              },
              {
                id: 'q2',
                q: 'Is online payment required?',
                a: 'Online payment is optional based on provider.',
              },
              {
                id: 'q3',
                q: 'Can I cancel or reschedule?',
                a: 'Yes, from your dashboard before service time.',
              },
              {
                id: 'q4',
                q: 'Are providers verified?',
                a: 'All providers go through verification.',
              },
              {
                id: 'q5',
                q: 'Can I become a partner?',
                a: 'Yes, register as a partner easily.',
              },
              {
                id: 'q6',
                q: 'Multiple locations supported?',
                a: 'Yes, manage multiple branches.',
              },
              {
                id: 'q7',
                q: 'How to contact support?',
                a: 'Email, chat, or contact form.',
              },
            ].map((item) => (
              <div key={item.id} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${item.id}`}
                  >
                    {item.q}
                  </button>
                </h2>
                <div
                  id={item.id}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faq"
                >
                  <div className="accordion-body">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
