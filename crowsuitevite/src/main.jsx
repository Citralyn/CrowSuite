import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App3 from './test_app3.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
//import App from './App.jsx'

// creates a root element by selecting a DOM node
// in this case, we have one at the div with id root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    <App3 />
    {/* can add other components here, or within App itself */}
    <Footer></Footer>
  </StrictMode>,
)
