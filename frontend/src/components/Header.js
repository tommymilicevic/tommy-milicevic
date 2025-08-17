import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', section: 'home' },
    { name: 'Services', section: 'services' },
    { name: 'About', section: 'about' },
    { name: 'Testimonials', section: 'testimonials' },
    { name: 'Contact', section: 'contact' }
  ];

  const handleNavClick = (section) => {
    if (location.pathname === '/') {
      // If on homepage, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to homepage with hash
      navigate('/');
      // After navigation, scroll to section with longer delay
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Increased delay
    }
    setIsMenuOpen(false);
  };

  const handleGetQuote = () => {
    navigate('/quote');
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav-wrapper">
          <div className="logo" onClick={handleLogoClick}>
            <img 
              src="https://customer-assets.emergentagent.com/job_home-services-mvp/artifacts/3gs3haj3_IMG_8442.png" 
              alt="Aurex Exteriors Logo" 
              className="logo-image"
            />
            <span className="logo-text">Aurex Exteriors</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.section)}
                className="nav-link"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <button className="btn-primary" onClick={handleGetQuote}>Get Quote</button>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.section)}
                className="mobile-nav-link"
              >
                {item.name}
              </button>
            ))}
            <button className="btn-primary mobile-cta" onClick={handleGetQuote}>Get Quote</button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, var(--primary-white) 0%, var(--silver-shine) 100%);
          border-bottom: 1px solid var(--silver-medium);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: var(--spacing-md) 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }
        
        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          cursor: pointer;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
        }
        
        .logo:hover {
          opacity: 0.8;
        }
        
        .logo-image {
          height: 60px;
          width: auto;
          object-fit: contain;
          max-width: 300px;
          background: transparent;
        }
        
        .logo h2 {
          color: var(--primary-black);
          margin: 0;
        }
        
        .nav-links {
          display: flex;
          gap: var(--spacing-lg);
          align-items: center;
        }
        
        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .nav-link:hover {
          color: var(--silver-dark);
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--primary-black);
        }
        
        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) 0;
          border-top: 1px solid var(--silver-light);
          margin-top: var(--spacing-sm);
        }
        
        .mobile-nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          padding: var(--spacing-sm) 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 1rem;
        }
        
        .mobile-nav-link:hover {
          color: var(--silver-dark);
        }
        
        .mobile-cta {
          margin-top: var(--spacing-sm);
          width: fit-content;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-nav {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;