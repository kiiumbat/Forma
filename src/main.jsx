import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Forma3D } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Forma3D />
  </StrictMode>,
)
