import { Link, useLocation } from 'react-router-dom';
import { Users, Home } from 'lucide-react';

// Layout principal remplaçant la navigation HTML statique
// Ajoute une navigation moderne avec indicateur de page active

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/employees', label: 'Current Employees', icon: Users }
  ];

  return (
    <div className="app-layout">
      {/* En-tête avec navigation */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>HRnet</h1>
            <span className="version">React Edition</span>
          </div>
          
          <nav className="main-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="app-main">
        <div className="main-content">
          {children}
        </div>
      </main>

      {/* Pied de page */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2025 HRnet - Application de gestion des employés</p>
          <p>Transformée de jQuery vers React avec Vite</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
