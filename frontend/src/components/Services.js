import React from 'react';
import { Droplets, Scissors, Trash2, Home, TreePine } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <Droplets size={32} />,
      title: "Pressure Washing",
      description: "Professional pressure washing for driveways, sidewalks, decks, and building exteriors. Remove years of dirt and grime.",
      features: ["Driveways & Sidewalks", "Building Exteriors", "Decks & Patios", "Eco-friendly Solutions"]
    },
    {
      id: 2,
      icon: <TreePine size={32} />,
      title: "Gardening Services",
      description: "Complete garden maintenance including planting, pruning, weeding, and seasonal garden care.",
      features: ["Garden Design", "Plant Installation", "Pruning & Trimming", "Seasonal Maintenance"]
    },
    {
      id: 3,
      icon: <Trash2 size={32} />,
      title: "Rubbish Removal",
      description: "Fast and reliable waste removal service for household, garden, and construction debris.",
      features: ["Household Waste", "Garden Debris", "Construction Waste", "Same Day Pickup"]
    },
    {
      id: 4,
      icon: <Home size={32} />,
      title: "Gutter Cleaning",
      description: "Thorough gutter cleaning and maintenance to protect your home from water damage.",
      features: ["Gutter Cleaning", "Downspout Clearing", "Gutter Repairs", "Maintenance Programs"]
    },
    {
      id: 5,
      icon: <Scissors size={32} />,
      title: "Lawn Mowing",
      description: "Regular lawn mowing and grass care to keep your property looking pristine year-round.",
      features: ["Weekly Mowing", "Edge Trimming", "Grass Care Tips", "Seasonal Packages"]
    }
  ];

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
                {service.icon}
              </div>
              <h3 className="heading-3">{service.title}</h3>
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
              <button className="btn-secondary service-btn">Learn More</button>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <h3 className="heading-2">Need Multiple Services?</h3>
          <p className="body-large">Get a bundled quote and save up to 15% on combined services.</p>
          <button className="btn-primary">Get Bundle Quote</button>
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