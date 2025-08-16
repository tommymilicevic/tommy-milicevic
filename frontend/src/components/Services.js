import React, { useState, useEffect } from 'react';
import { Droplets, Scissors, Trash2, Home, TreePine, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping
  const iconMap = {
    'droplets': Droplets,
    'tree-pine': TreePine,
    'trash-2': Trash2,
    'home': Home,
    'scissors': Scissors
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
              <div className="service-icon">
                {getIcon(service.icon)}
              </div>
              <h3 className="heading-3">{service.name}</h3>
              <p className="body-medium service-description">
                {service.description}
              </p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-bullet">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="service-pricing">
                <span className="price">Starting at ${service.pricing.starting}</span>
                <span className="price-unit">{service.pricing.unit}</span>
              </div>
              <button className="btn-secondary service-btn" onClick={scrollToContact}>Get Quote</button>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <h3 className="heading-2">Need Multiple Services?</h3>
          <p className="body-large">Get a bundled quote and save up to 10% on combined services.</p>
          <button className="btn-primary" onClick={scrollToContact}>Get Bundle Quote</button>
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-giant);
        }
        
        .service-card {
          padding: var(--spacing-xl);
          text-align: center;
        }
        
        .service-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          background: var(--silver-light);
          border-radius: 50%;
          margin: 0 auto var(--spacing-lg) auto;
          color: var(--primary-black);
        }
        
        .service-card h3 {
          margin-bottom: var(--spacing-md);
        }
        
        .service-description {
          margin-bottom: var(--spacing-lg);
          color: var(--text-secondary);
        }
        
        .service-features {
          list-style: none;
          margin-bottom: var(--spacing-lg);
          text-align: left;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          color: var(--text-secondary);
        }
        
        .feature-bullet {
          color: var(--primary-black);
          font-weight: bold;
        }
        
        .service-pricing {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--silver-light);
          border-radius: 8px;
        }
        
        .price {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-black);
        }
        
        .price-unit {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .service-btn {
          width: 100%;
        }
        
        .services-cta {
          text-align: center;
          padding: var(--spacing-xl);
          background: var(--silver-light);
          border-radius: 16px;
          margin-top: var(--spacing-xl);
        }
        
        .services-cta h3 {
          margin-bottom: var(--spacing-md);
        }
        
        .services-cta p {
          margin-bottom: var(--spacing-lg);
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
          
          .service-card {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;