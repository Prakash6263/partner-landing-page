import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100" style={{ position: 'fixed', zIndex: 999 }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          <img src="/images/logo-2.png" alt="Appointment Hub Logo" style={{ height: '40px' }} />
        </Link>

        <div className="ms-auto">
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
