import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import NotFound from './pages/NotFound'
import './index.css'

// The portfolio is a single page. Any other path (including /404.html) shows the 404 page.
// Paths are compared relative to the base path, so this also works under e.g. /repo-name/.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
const path = window.location.pathname.slice(base.length).replace(/\/+$/, '')
const isHome = path === '' || path === '/index.html'

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>,
)
