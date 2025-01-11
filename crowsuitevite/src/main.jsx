import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App2 from './test_app2.jsx'
//import App from './App.jsx'

// creates a root element by selecting a DOM node
// in this case, we have one at the div with id root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2 />
    {/* can add other components here, or within App itself */}
  </StrictMode>,
)
