import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Employee from './pages/Employee'
import './index.css'

// Configuration React Router remplaçant la navigation HTML statique
// Ajout du contexte global et du layout pour une architecture moderne

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Home />} />
            <Route path="/employees" element={<Employee />} />
          </Routes>
        </Layout>
      </Router>
    </EmployeeProvider>
  </StrictMode>,
)
