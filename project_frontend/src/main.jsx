import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// API base URL: set VITE_API_URL (e.g. https://welzone-backend.onrender.com) in production
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Rewrite any hardcoded localhost backend URL to the deployed backend, and attach the JWT token
axios.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('http://localhost:8080')) {
    config.url = config.url.replace('http://localhost:8080', API_BASE)
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the backend rejects the token, force a logout
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('Id')
      localStorage.removeItem('whoLogged')
      localStorage.removeItem('isAuthenticated')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
