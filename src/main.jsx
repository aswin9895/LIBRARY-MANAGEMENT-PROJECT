import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ResponseAPI from './ContextAPI/ResponseAPI.jsx'
import AuthContextAPI from './ContextAPI/AuthContet.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthContextAPI>
        <ResponseAPI>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ResponseAPI>
      </AuthContextAPI>
  </StrictMode>,
)
