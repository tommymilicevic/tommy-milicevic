import React from 'react';
import { Shield, Clock, Users, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users size={24} />, number: "50+", label: "Happy Customers" },
    { icon: <Clock size={24} />, number: "2+", label: "Years Experience" },
    { icon: <Award size={24} />, number: "100%", label: "Satisfaction Rate" },
    { icon: <Shield size={24} />, number: "24/7", label: "Support Available" }
  ];

  return (
    <section id="about" className="about section section-alt">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="heading-1">Why Choose Aurex Exteriors?</h2>
            <p className="body-large about-description">
              With over 2 years of experience in home maintenance, we've built our reputation 
              on reliability, quality, and customer satisfaction. Our team of licensed professionals 
              is committed to exceeding your expectations.
            </p>
            
            <div className="about-features">
              <div className="feature-row">
                <Shield size={24} className="feature-icon" />
                <div>
                  <h4 className="heading-3">Licensed & Insured</h4>
                  <p className="body-medium">Fully licensed and insured for your peace of mind.</p>
                </div>
              </div>
              
              <div className="feature-row">
                <Clock size={24} className="feature-icon" />
                <div>
                  <h4 className="heading-3">Reliable Service</h4>
                  <p className="body-medium">On-time service with flexible scheduling options.</p>
                </div>
              </div>
              
              <div className="feature-row">
                <Award size={24} className="feature-icon" />
                <div>
                  <h4 className="heading-3">Quality Guarantee</h4>
                  <p className="body-medium">100% satisfaction guarantee on all our services.</p>
                </div>
              </div>
            </div>
            
            <button className="btn-primary">Learn More About Us</button>
          </div>
          
          <div className="about-stats">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
        }
        
        .about-description {
          margin: var(--spacing-lg) 0;
          color: var(--text-secondary);
        }
        
        .about-features {
          margin: var(--spacing-xl) 0;
        }
        
        .feature-row {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }
        
        .feature-icon {
          color: var(--primary-black);
          flex-shrink: 0;
          margin-top: 4px;
        }
        
        .feature-row h4 {
          margin-bottom: var(--spacing-xs);
        }
        
        .feature-row p {
          color: var(--text-secondary);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }
        
        .stat-card {
          background: var(--primary-white);
          padding: var(--spacing-lg);
          border-radius: 16px;
          text-align: center;
          border: 2px solid var(--silver-medium);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
        }
        
        .stat-icon {
          display: flex;
          justify-content: center;
          margin-bottom: var(--spacing-sm);
          color: var(--primary-black);
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-black);
          margin-bottom: var(--spacing-xs);
        }
        
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;