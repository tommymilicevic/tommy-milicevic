import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2, Upload, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Quote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    photos: []
  });
  
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (submissionState.error) {
      setSubmissionState(prev => ({ ...prev, error: null }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: files
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message || '');
      
      if (formData.photos && formData.photos.length > 0) {
        formData.photos.forEach((photo) => {
          formDataToSend.append('photos', photo);
        });
      }
      
      const response = await apiService.submitContactFormWithFiles(formDataToSend);
      
      if (response.success) {
        setSubmissionState({
          loading: false,
          success: true,
          error: null
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          photos: []
        });
        
        setTimeout(() => {
          setSubmissionState(prev => ({ ...prev, success: false }));
        }, 5000);
        
      } else {
        setSubmissionState({
          loading: false,
          success: false,
          error: response.error || 'Failed to submit quote request. Please try again.'
        });
      }
    } catch (error) {
      console.error('Quote form submission error:', error);
      setSubmissionState({
        loading: false,
        success: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <div className="quote-page">
      <div className="quote-hero">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="quote-hero-content">
            <h1 className="display-large">Get Your Free Quote</h1>
            <p className="body-large">
              Tell us about your project and upload photos for an accurate quote. 
              We'll respond within 2 hours with a detailed estimate.
            </p>
          </div>
        </div>
      </div>

      <section className="quote-form-section">
        <div className="container">
          <div className="quote-content">
            <div className="quote-info">
              <h3 className="heading-2">Quick Contact</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Phone size={24} />
                  </div>
                  <div className="method-info">
                    <h4 className="method-title">Call Now</h4>
                    <p className="method-main">Mo: 0424 910 154</p>
                    <p className="method-main">Tom: 0450 515 119</p>
                    <p className="method-subtitle">Available 24/7</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">
                    <Mail size={24} />
                  </div>
                  <div className="method-info">
                    <h4 className="method-title">Email Us</h4>
                    <p className="method-main">AurexExteriors@gmail.com</p>
                    <p className="method-subtitle">Response within 2 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="method-info">
                    <h4 className="method-title">Service Area</h4>
                    <p className="method-main">Canberra, ACT</p>
                    <p className="method-subtitle">2600-2617 postcode areas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="quote-form-container">
              {submissionState.success && (
                <div className="alert alert-success">
                  <CheckCircle size={20} />
                  <span>Thank you! Your quote request has been submitted. We'll contact you within 2 hours.</span>
                </div>
              )}
              
              {submissionState.error && (
                <div className="alert alert-error">
                  <AlertCircle size={20} />
                  <span>{submissionState.error}</span>
                </div>
              )}
              
              <form className="quote-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your project, property size, specific requirements..."
                    disabled={submissionState.loading}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="photos">Upload Photos for Accurate Quote</label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={submissionState.loading}
                      className="file-input"
                    />
                    <div className="file-input-label">
                      <Upload size={20} />
                      <span>Choose photos to upload</span>
                    </div>
                  </div>
                  
                  {formData.photos.length > 0 && (
                    <div className="uploaded-files">
                      {formData.photos.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <span className="file-name">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="remove-file-btn"
                            disabled={submissionState.loading}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary form-submit"
                  disabled={submissionState.loading}
                >
                  {submissionState.loading ? (
                    <>
                      <Loader2 size={20} className="btn-spinner" />
                      Submitting Quote Request...
                    </>
                  ) : (
                    'Get My Free Quote'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .quote-page {
          min-height: 100vh;
          background: var(--primary-white);
        }
        
        .quote-hero {
          background: linear-gradient(135deg, var(--primary-black) 0%, var(--silver-dark) 100%);
          color: var(--primary-white);
          padding: calc(80px + var(--spacing-xl)) 0 var(--spacing-xl) 0;
        }
        
        .back-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: transparent;
          border: 2px solid var(--primary-white);
          color: var(--primary-white);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: 8px;
          margin-bottom: var(--spacing-lg);
          transition: all 0.2s ease;
          cursor: pointer;
          font-weight: 500;
        }
        
        .back-btn:hover {
          background: var(--primary-white);
          color: var(--primary-black);
        }
        
        .quote-hero-content {
          text-align: center;
        }
        
        .quote-hero h1 {
          color: var(--primary-white);
          margin-bottom: var(--spacing-md);
        }
        
        .quote-hero p {
          color: var(--silver-light);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .quote-form-section {
          padding: var(--spacing-giant) 0;
        }
        
        .quote-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-giant);
          align-items: start;
        }
        
        .quote-info {
          background: var(--silver-light);
          padding: var(--spacing-xl);
          border-radius: 16px;
          border: 2px solid var(--silver-medium);
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          margin-top: var(--spacing-lg);
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
        
        .quote-form-container {
          background: var(--primary-white);
          padding: var(--spacing-xl);
          border-radius: 16px;
          border: 2px solid var(--silver-medium);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
        
        .quote-form {
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
        
        .file-input-container {
          position: relative;
        }
        
        .file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        .file-input-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: 16px;
          border: 2px dashed var(--silver-medium);
          border-radius: 8px;
          background: var(--silver-light);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .file-input-label:hover {
          border-color: var(--primary-black);
          background: var(--silver-shine);
        }
        
        .uploaded-files {
          margin-top: var(--spacing-sm);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .uploaded-file {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-sm);
          background: var(--silver-light);
          border-radius: 6px;
          border: 1px solid var(--silver-medium);
        }
        
        .file-name {
          font-size: 14px;
          color: var(--text-primary);
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .remove-file-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }
        
        .remove-file-btn:hover {
          color: var(--primary-black);
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
          .quote-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .quote-form-container {
            padding: var(--spacing-lg);
          }
          
          .quote-info {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </div>
  );
};

export default Quote;