import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav-wrapper">
          <div className="logo">
            <h2 className="heading-3">Aurex Exteriors</h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </div>
          
          <button className="btn-primary" onClick={scrollToContact}>Get Quote</button>
          
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
              <a 
                key={item.name} 
                href={item.href} 
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="btn-primary mobile-cta" onClick={scrollToContact}>Get Quote</button>
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
          padding: var(--spacing-sm) 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }
        
        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
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