import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="navbar-brand">
          <img src="/images/logo-2.png" alt="Appointment Hub Logo" />

        </Link>

        <div style={{ marginLeft: 'auto' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-primary px-4 rounded-pill">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
