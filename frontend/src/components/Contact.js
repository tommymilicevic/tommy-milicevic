import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: null
  });

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
      console.error('Error fetching company info:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (submissionState.error) {
      setSubmissionState(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous states
    setSubmissionState({ loading: false, success: false, error: null });
    
    // Basic validation
    if (!formData.name.trim()) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Please enter your full name.'
      });
      return;
    }
    
    if (!formData.email.trim()) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Please enter your email address.'
      });
      return;
    }
    
    if (!formData.service) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Please select a service.'
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Please enter a valid email address.'
      });
      return;
    }

    setSubmissionState({ loading: true, success: false, error: null });

    try {
      const response = await apiService.submitContactForm(formData);
      
      if (response.success) {
        setSubmissionState({
          loading: false,
          success: true,
          error: null
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmissionState(prev => ({ ...prev, success: false }));
        }, 5000);
        
      } else {
        setSubmissionState({
          loading: false,
          success: false,
          error: response.error || 'Failed to submit form. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      info: companyInfo?.phone || "(555) 123-4567",
      subtitle: "Available 24/7"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      info: companyInfo?.email || "info@cleanproservices.com",
      subtitle: "Response within 2 hours"
    },
    {
      icon: <MapPin size={24} />,
      title: "Service Area",
      info: companyInfo?.address || "Canberra, Australian Capital Territory (ACT)",
      subtitle: companyInfo?.service_radius || "2600-2617 postcode areas"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      info: companyInfo?.business_hours?.weekdays || "Mon-Sat: 7AM-7PM",
      subtitle: companyInfo?.business_hours?.sunday || "Sunday: 9AM-5PM"
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
            {submissionState.success && (
              <div className="alert alert-success">
                <CheckCircle size={20} />
                <span>Thank you! We'll contact you within 2 hours.</span>
              </div>
            )}
            
            {submissionState.error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{submissionState.error}</span>
              </div>
            )}
            
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
                  disabled={submissionState.loading}
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
                    disabled={submissionState.loading}
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
                    disabled={submissionState.loading}
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
                  disabled={submissionState.loading}
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
                  disabled={submissionState.loading}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary form-submit"
                disabled={submissionState.loading}
              >
                {submissionState.loading ? (
                  <>
                    <Loader2 size={20} className="btn-spinner" />
                    Submitting...
                  </>
                ) : (
                  'Get Free Quote'
                )}
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
        
        .alert {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          border-radius: 8px;
          margin-bottom: var(--spacing-lg);
          font-weight: 500;
        }
        
        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
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
        
        .form-group input:disabled,
        .form-group select:disabled,
        .form-group textarea:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-submit {
          width: 100%;
          margin-top: var(--spacing-md);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
        }
        
        .form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .btn-spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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