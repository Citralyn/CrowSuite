import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Main.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// creates a root element by selecting a DOM node
// in this case, we have one at the div with id root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    <App />
    <Footer></Footer>
  </StrictMode>,
)
