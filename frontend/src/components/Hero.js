import React from 'react';
import { CheckCircle, Star, Droplets, Zap, Trash2, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/quote');
  };

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
                <span>Same Day Service</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} className="feature-icon" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} className="feature-icon" />
                <span>Professional Quality</span>
              </div>
            </div>
            
            <div className="hero-cta">
              <button className="btn-primary hero-btn" onClick={handleGetQuote}>Get Free Quote</button>
              <a href="tel:0424910154" className="btn-secondary hero-btn">Call Mo: 0424 910 154</a>
              <a href="tel:0450515119" className="btn-secondary hero-btn">Call Tom: 0450 515 119</a>
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
                <div className="icon-item">
                  <Droplets size={28} />
                </div>
                <div className="icon-item">
                  <Zap size={28} />
                </div>
                <div className="icon-item">
                  <Trash2 size={28} />
                </div>
                <div className="icon-item">
                  <Leaf size={28} />
                </div>
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
          flex-direction: column;
          gap: var(--spacing-md);
          margin: var(--spacing-xl) 0;
          align-items: stretch;
        }
        
        .hero-btn {
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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
          background: linear-gradient(145deg, var(--silver-light) 0%, var(--silver-shine) 50%, var(--primary-white) 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--silver-medium);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .image-placeholder::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: rotate(0deg) translateX(-100%); }
          100% { transform: rotate(0deg) translateX(100%); }
        }
        
        .service-icons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          z-index: 2;
          position: relative;
        }
        
        .icon-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-sm);
          background: linear-gradient(145deg, var(--primary-white) 0%, var(--silver-shine) 100%);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--silver-medium);
          transition: all 0.3s ease;
          color: var(--primary-black);
        }
        
        .icon-item:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
          background: linear-gradient(145deg, var(--silver-shine) 0%, var(--primary-white) 100%);
          color: var(--silver-dark);
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