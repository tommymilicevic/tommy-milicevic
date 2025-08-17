import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { apiService } from '../services/api';

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await apiService.getCompanyInfo();
      if (response.success) {
        setCompanyInfo(response.data);
      }
    } catch (error) {
      console.error('Error fetching company info in footer:', error);
    }
  };

  const services = [
    "Pressure Washing",
    "Gardening Services", 
    "Rubbish Removal",
    "Gutter Cleaning",
    "Lawn Mowing"
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="https://customer-assets.emergentagent.com/job_home-services-mvp/artifacts/3gs3haj3_IMG_8442.png" 
                alt="Aurex Exteriors Logo" 
                className="footer-logo-image"
              />
            </div>
            <p className="footer-description">
              {companyInfo?.tagline || "Your trusted partner for comprehensive exterior maintenance services. Professional, reliable, and guaranteed satisfaction."}
            </p>
            <div className="social-links">
              <a 
                href="https://www.facebook.com/aurexexteriors" 
                className="social-link" 
                aria-label="Facebook - AurexExteriors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/aurexexteriors" 
                className="social-link" 
                aria-label="Instagram - AurexExteriors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="footer-link">{service}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#testimonials" className="footer-link">Testimonials</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>Mo: 0424 910 154, Tom: 0450 515 119</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>{companyInfo?.email || "AurexExteriors@gmail.com"}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{companyInfo?.address || "Canberra, Australian Capital Territory (ACT)"}</span>
              </div>
            </div>
            <div className="business-hours">
              <h5>Business Hours</h5>
              <p>{companyInfo?.business_hours?.weekdays || "Mon-Sat: 7AM-7PM"}</p>
              <p>{companyInfo?.business_hours?.sunday || "Sunday: 9AM-5PM"}</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2023 Aurex Exteriors. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: var(--primary-black);
          color: var(--primary-white);
          padding: var(--spacing-giant) 0 var(--spacing-lg) 0;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }
        
        .footer-section h3,
        .footer-section h4 {
          margin-bottom: var(--spacing-md);
        }
        
        .footer-title {
          color: var(--primary-white);
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .footer-logo {
          margin-bottom: var(--spacing-md);
        }
        
        .footer-logo-image {
          height: 80px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1); /* Makes the logo white */
          max-width: 250px;
        }
        
        .footer-subtitle {
          color: var(--primary-white);
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .footer-description {
          color: var(--silver-medium);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }
        
        .social-links {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--silver-dark);
          border-radius: 50%;
          color: var(--primary-white);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .social-link:hover {
          background: var(--primary-white);
          color: var(--primary-black);
          transform: translateY(-2px);
        }
        
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .footer-link {
          color: var(--silver-medium);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-link:hover {
          color: var(--primary-white);
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--silver-medium);
        }
        
        .business-hours {
          margin-top: var(--spacing-lg);
        }
        
        .business-hours h5 {
          color: var(--primary-white);
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
        }
        
        .business-hours p {
          color: var(--silver-medium);
          font-size: 0.9rem;
          margin-bottom: 2px;
        }
        
        .footer-divider {
          height: 1px;
          background: var(--silver-dark);
          margin: var(--spacing-lg) 0;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .copyright {
          color: var(--silver-medium);
          font-size: 0.9rem;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: var(--spacing-lg);
        }
        
        .footer-bottom-link {
          color: var(--silver-medium);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }
        
        .footer-bottom-link:hover {
          color: var(--primary-white);
        }
        
        @media (max-width: 968px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-lg);
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }
          
          .footer-bottom-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;