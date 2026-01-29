import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100 position-fixed" style={{ zIndex: 999 }}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <img src="/images/logo-2.png" />
        </Link>

        <div id="nav">
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
