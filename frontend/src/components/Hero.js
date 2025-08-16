import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="display-large">
              Professional Home Services You Can Trust
            </h1>
            <p className="body-large hero-description">
              From pressure washing to lawn care, we provide comprehensive home maintenance 
              services with guaranteed satisfaction. Your property deserves the best care.
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <CheckCircle size={20} className="feature-icon" />
                <span>Licensed & Insured</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} className="feature-icon" />
                <span>Same Day Service</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} className="feature-icon" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
            
            <div className="hero-cta">
              <button className="btn-primary hero-btn">Get Free Quote</button>
              <button className="btn-secondary hero-btn">Call Now: 0450515119</button>
            </div>
            
            <div className="hero-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? "var(--primary-black)" : "transparent"} stroke="var(--primary-black)" />
                ))}
              </div>
              <span className="rating-text">4.2/5 from 50+ customers</span>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="service-icons">
                <div className="icon-item">🏠</div>
                <div className="icon-item">🧽</div>
                <div className="icon-item">🌿</div>
                <div className="icon-item">✨</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          padding: calc(80px + var(--spacing-giant)) 0 var(--spacing-giant) 0;
          background: var(--primary-white);
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
        }
        
        .hero-text {
          max-width: 600px;
        }
        
        .hero-description {
          margin: var(--spacing-lg) 0;
          color: var(--text-secondary);
        }
        
        .hero-features {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin: var(--spacing-lg) 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
        }
        
        .feature-icon {
          color: var(--primary-black);
        }
        
        .hero-cta {
          display: flex;
          gap: var(--spacing-md);
          margin: var(--spacing-xl) 0;
        }
        
        .hero-btn {
          flex: 1;
          text-align: center;
        }
        
        .hero-rating {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .stars {
          display: flex;
          gap: 2px;
        }
        
        .rating-text {
          color: var(--text-light);
          font-size: 14px;
        }
        
        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .image-placeholder {
          width: 400px;
          height: 400px;
          background: var(--silver-light);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--silver-medium);
        }
        
        .service-icons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }
        
        .icon-item {
          font-size: 3rem;
          text-align: center;
          padding: var(--spacing-md);
          background: var(--primary-white);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
            text-align: center;
          }
          
          .hero-cta {
            flex-direction: column;
          }
          
          .image-placeholder {
            width: 300px;
            height: 300px;
          }
          
          .icon-item {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;