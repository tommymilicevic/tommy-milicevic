import React, { useState, useEffect } from 'react';
import { Droplets, Scissors, Trash2, Home, TreePine, Loader2, Paintbrush } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Icon mapping
  const iconMap = {
    'droplets': Droplets,
    'tree-pine': TreePine,
    'trash-2': Trash2,
    'home': Home,
    'scissors': Scissors,
    'brush': Paintbrush
  };

  const handleGetQuote = () => {
    navigate('/quote');
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiService.getServices();
      
      if (response.success) {
        setServices(response.data);
        setError(null);
      } else {
        setError(response.error);
        console.error('Failed to fetch services:', response.error);
      }
    } catch (err) {
      setError('Failed to load services. Please try again later.');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Home;
    return <IconComponent size={32} />;
  };

  if (loading) {
    return (
      <section id="services" className="services section">
        <div className="container">
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={48} />
            <p>Loading our services...</p>
          </div>
        </div>
        
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-giant);
            color: var(--text-secondary);
          }
          
          .loading-spinner {
            animation: spin 1s linear infinite;
            margin-bottom: var(--spacing-md);
            color: var(--primary-black);
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="services section">
        <div className="container">
          <div className="error-container">
            <h3>Unable to load services</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={fetchServices}>
              Try Again
            </button>
          </div>
        </div>
        
        <style jsx>{`
          .error-container {
            text-align: center;
            padding: var(--spacing-giant);
            color: var(--text-secondary);
          }
          
          .error-container h3 {
            color: var(--primary-black);
            margin-bottom: var(--spacing-md);
          }
          
          .error-container p {
            margin-bottom: var(--spacing-lg);
          }
        `}</style>
      </section>
    );
  }

  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1">Our Professional Services</h2>
          <p className="body-large section-description">
            We offer comprehensive home maintenance services to keep your property in perfect condition.
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  {getIcon(service.icon)}
                </div>
                <div className="service-title">
                  <h3 className="heading-3">{service.name}</h3>
                </div>
              </div>
              
              <p className="body-medium service-description">
                {service.description}
              </p>
              
              <div className="service-features">
                <h4 className="features-title">What's Included:</h4>
                <ul className="features-list">
                  {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="service-footer">
                <div className="service-pricing">
                  <span className="price-label">Starting at</span>
                  <span className="price">${service.pricing.starting}</span>
                  <span className="price-unit">{service.pricing.unit}</span>
                </div>
                <button className="btn-secondary service-btn" onClick={handleGetQuote}>
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <h3 className="heading-2">Need Multiple Services?</h3>
          <p className="body-large">Get a bundled quote and save up to 10% on combined services.</p>
          <button className="btn-primary" onClick={handleGetQuote}>Get Bundle Quote</button>
        </div>
      </div>
      
      <style jsx>{`
        .services {
          background: var(--primary-white);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-giant);
        }
        
        .section-description {
          margin-top: var(--spacing-md);
          color: var(--text-secondary);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-giant);
        }
        
        .service-card {
          background: var(--primary-white);
          border: 2px solid var(--silver-light);
          border-radius: 20px;
          padding: var(--spacing-xl);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-black) 0%, var(--silver-dark) 100%);
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--silver-medium);
        }
        
        .service-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }
        
        .service-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 72px;
          height: 72px;
          background: var(--bg-gradient-1);
          border-radius: 16px;
          color: var(--primary-white);
          flex-shrink: 0;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
        
        .service-card:hover .service-icon {
          background: var(--bg-gradient-2);
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
        }
        
        .service-card:nth-child(2n) .service-icon {
          background: var(--bg-gradient-2);
        }
        
        .service-card:nth-child(2n):hover .service-icon {
          background: var(--bg-gradient-3);
        }
        
        .service-card:nth-child(3n) .service-icon {
          background: var(--bg-gradient-3);
        }
        
        .service-card:nth-child(3n):hover .service-icon {
          background: var(--bg-gradient-1);
        }
        
        .service-title h3 {
          margin: 0;
          color: var(--primary-black);
        }
        
        .service-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }
        
        .service-features {
          margin-bottom: var(--spacing-lg);
        }
        
        .features-title {
          font-weight: 600;
          color: var(--primary-black);
          font-size: 0.95rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .feature-check {
          color: var(--primary-black);
          font-weight: bold;
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .service-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--silver-light);
        }
        
        .service-pricing {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .price-label {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-black);
        }
        
        .price-unit {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        
        .service-btn {
          padding: 12px 24px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 120px;
        }
        
        .service-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .services-cta {
          text-align: center;
          padding: var(--spacing-giant);
          background: var(--bg-gradient-1);
          color: var(--primary-white);
          border-radius: 24px;
          margin-top: var(--spacing-xl);
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.3);
        }
        
        .services-cta::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          animation: shine 4s infinite;
        }
        
        .services-cta::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(5, 150, 105, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }
        
        @keyframes shine {
          0% { transform: rotate(0deg) translateX(-100%); }
          100% { transform: rotate(0deg) translateX(100%); }
        }
        
        .services-cta h3 {
          color: var(--primary-white);
          margin-bottom: var(--spacing-md);
          position: relative;
          z-index: 2;
        }
        
        .services-cta p {
          color: var(--silver-light);
          margin-bottom: var(--spacing-lg);
          position: relative;
          z-index: 2;
        }
        
        .services-cta .btn-primary {
          background: var(--primary-white);
          color: var(--primary-black);
          border: 2px solid var(--primary-white);
          position: relative;
          z-index: 2;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 12px;
        }
        
        .services-cta .btn-primary:hover {
          background: transparent;
          color: var(--primary-white);
          border-color: var(--primary-white);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .service-card {
            padding: var(--spacing-lg);
          }
          
          .service-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .service-footer {
            flex-direction: column;
            gap: var(--spacing-md);
          }
          
          .service-pricing {
            align-items: center;
            text-align: center;
          }
          
          .service-btn {
            width: 100%;
          }
          
          .services-cta {
            padding: var(--spacing-xl);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;