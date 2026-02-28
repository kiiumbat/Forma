import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Forma3DLogo } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Forma3DLogo />
  </StrictMode>,
)
