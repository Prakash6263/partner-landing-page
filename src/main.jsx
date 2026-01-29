import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// CSS ORDER MATTERS
import '/css/bootstrap.min.css'
import '/css/style.css'



// Bootstrap JS (accordion, navbar, collapse, etc)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
