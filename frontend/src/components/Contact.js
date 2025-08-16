import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      info: "(555) 123-4567",
      subtitle: "Available 24/7"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      info: "info@cleanproservices.com",
      subtitle: "Response within 2 hours"
    },
    {
      icon: <MapPin size={24} />,
      title: "Service Area",
      info: "Greater Metro Area",
      subtitle: "Within 25 mile radius"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      info: "Mon-Sat: 7AM-7PM",
      subtitle: "Sunday: 9AM-5PM"
    }
  ];

  return (
    <section id="contact" className="contact section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1">Get Your Free Quote Today</h2>
          <p className="body-large section-description">
            Ready to transform your property? Contact us for a free, no-obligation quote.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="heading-2">Get In Touch</h3>
            <p className="body-medium contact-description">
              We're here to help with all your home maintenance needs. 
              Reach out to us using any of the methods below.
            </p>
            
            <div className="contact-methods">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">
                    {item.icon}
                  </div>
                  <div className="method-info">
                    <h4 className="method-title">{item.title}</h4>
                    <p className="method-main">{item.info}</p>
                    <p className="method-subtitle">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Service Needed *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="pressure-washing">Pressure Washing</option>
                  <option value="gardening">Gardening Services</option>
                  <option value="rubbish-removal">Rubbish Removal</option>
                  <option value="gutter-cleaning">Gutter Cleaning</option>
                  <option value="lawn-mowing">Lawn Mowing</option>
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary form-submit">
                Get Free Quote
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: start;
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
        
        .contact-description {
          margin: var(--spacing-lg) 0;
          color: var(--text-secondary);
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        
        .contact-method {
          display: flex;
          gap: var(--spacing-md);
          align-items: flex-start;
        }
        
        .method-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: var(--primary-white);
          border-radius: 50%;
          color: var(--primary-black);
          flex-shrink: 0;
        }
        
        .method-title {
          font-weight: 600;
          color: var(--primary-black);
          margin-bottom: var(--spacing-xs);
        }
        
        .method-main {
          color: var(--text-primary);
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .method-subtitle {
          color: var(--text-light);
          font-size: 0.9rem;
        }
        
        .contact-form-container {
          background: var(--primary-white);
          padding: var(--spacing-xl);
          border-radius: 16px;
          border: 2px solid var(--silver-medium);
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group label {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: var(--spacing-xs);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 16px;
          border: 2px solid var(--silver-light);
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s ease;
          background: var(--primary-white);
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-black);
        }
        
        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-submit {
          width: 100%;
          margin-top: var(--spacing-md);
        }
        
        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .contact-form-container {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;