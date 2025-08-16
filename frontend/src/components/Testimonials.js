import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "Pressure Washing & Lawn Care",
      rating: 5,
      text: "CleanPro transformed our driveway and lawn completely! The team was professional, punctual, and the results exceeded our expectations. Highly recommended!",
      location: "Springfield"
    },
    {
      id: 2,
      name: "Mike Chen",
      service: "Gutter Cleaning & Gardening",
      rating: 5,
      text: "Outstanding service! They cleaned our gutters thoroughly and helped redesign our garden. The attention to detail is impressive. Will definitely use again.",
      location: "Riverside"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      service: "Rubbish Removal",
      rating: 5,
      text: "Fast, efficient, and affordable rubbish removal. They handled our renovation debris professionally and left the area spotless. Great communication throughout.",
      location: "Downtown"
    }
  ];

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
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-cta">
          <h3 className="heading-2">Ready to Join Our Happy Customers?</h3>
          <p className="body-large">Experience the CleanPro difference for yourself.</p>
          <button className="btn-primary">Get Your Free Quote</button>
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