import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeCredit from './HomeCredit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomeCredit />
  </StrictMode>,
)
