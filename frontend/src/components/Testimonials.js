import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/quote');
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTestimonials();
      
      if (response.success) {
        setTestimonials(response.data);
        setError(null);
      } else {
        setError(response.error);
        console.error('Failed to fetch testimonials:', response.error);
      }
    } catch (err) {
      setError('Failed to load testimonials. Please try again later.');
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Recently';
    }
  };

  if (loading) {
    return (
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={48} />
            <p>Loading customer reviews...</p>
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
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="error-container">
            <h3>Unable to load testimonials</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={fetchTestimonials}>
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
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1">What Our Customers Say</h2>
          <p className="body-large section-description">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-icon">
                <Quote size={24} />
              </div>
              
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary-black)" />
                ))}
              </div>
              
              <p className="testimonial-text">"{testimonial.text}"</p>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-service">{testimonial.service}</p>
                  <p className="author-location">{testimonial.location}</p>
                  <p className="author-date">{formatDate(testimonial.date)}</p>
                  {testimonial.verified && (
                    <span className="verified-badge">✓ Verified Customer</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-cta">
          <h3 className="heading-2">Ready to Join Our Happy Customers?</h3>
          <p className="body-large">Experience the Aurex Exteriors difference for yourself.</p>
          <button className="btn-primary" onClick={handleGetQuote}>Get Your Free Quote</button>
        </div>
      </div>
      
      <style jsx>{`
        .testimonials {
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
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-giant);
        }
        
        .testimonial-card {
          background: var(--silver-light);
          padding: var(--spacing-xl);
          border-radius: 16px;
          position: relative;
          border: 2px solid var(--silver-medium);
          transition: transform 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .quote-icon {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          color: var(--silver-dark);
        }
        
        .rating {
          display: flex;
          gap: 2px;
          margin-bottom: var(--spacing-md);
        }
        
        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: var(--spacing-lg);
          font-style: italic;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .author-name {
          font-weight: 600;
          color: var(--primary-black);
          margin-bottom: var(--spacing-xs);
        }
        
        .author-service {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 2px;
        }
        
        .author-location {
          color: var(--text-light);
          font-size: 0.85rem;
          margin-bottom: 2px;
        }
        
        .author-date {
          color: var(--text-light);
          font-size: 0.8rem;
          margin-bottom: var(--spacing-xs);
        }
        
        .verified-badge {
          background: var(--primary-black);
          color: var(--primary-white);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
        
        .testimonials-cta {
          text-align: center;
          padding: var(--spacing-xl);
          background: var(--primary-black);
          color: var(--primary-white);
          border-radius: 16px;
        }
        
        .testimonials-cta h3 {
          color: var(--primary-white);
          margin-bottom: var(--spacing-md);
        }
        
        .testimonials-cta p {
          color: var(--silver-medium);
          margin-bottom: var(--spacing-lg);
        }
        
        .testimonials-cta .btn-primary {
          background: var(--primary-white);
          color: var(--primary-black);
        }
        
        .testimonials-cta .btn-primary:hover {
          background: var(--silver-light);
        }
        
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .testimonial-card {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;