import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import NotFound from './pages/NotFound'
import './index.css'

// The portfolio is a single page. Any other path (including /404.html) shows the 404 page.
const path = window.location.pathname.replace(/\/+$/, '')
const isHome = path === '' || path === '/index.html'

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>,
)
