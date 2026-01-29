import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100 position-fixed" style={{ zIndex: 999 }}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <img src="/images/logo-2.png" alt="Appointment Hub Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ms-2">
              <Link to="#" className="btn btn-primary px-4 rounded-pill">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
