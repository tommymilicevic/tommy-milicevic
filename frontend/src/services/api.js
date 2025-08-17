import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`, error.response?.data);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Services API
  async getServices() {
    try {
      const response = await apiClient.get('/services');
      return { 
        success: true, 
        data: response.data.data || [],
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: [] 
      };
    }
  },

  async getService(serviceId) {
    try {
      const response = await apiClient.get(`/services/${serviceId}`);
      return { 
        success: true, 
        data: response.data.data,
        message: response.data.message 
      };
    } catch (error) {
      console.error(`Error fetching service ${serviceId}:`, error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: null 
      };
    }
  },

  // Testimonials API
  async getTestimonials() {
    try {
      const response = await apiClient.get('/testimonials');
      return { 
        success: true, 
        data: response.data.data || [],
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: [] 
      };
    }
  },

  // Quote Request API
  async submitQuoteRequest(quoteData) {
    try {
      const response = await apiClient.post('/quote-request', quoteData);
      return { 
        success: true, 
        data: response.data.data,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error submitting quote request:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: null 
      };
    }
  },

  // Contact Form API
  async submitContactForm(contactData) {
    try {
      const response = await apiClient.post('/contact', contactData);
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message 
      };
    }
  },

  // Contact Form with File Upload API
  async submitContactFormWithFiles(formData) {
    try {
      const response = await axios.post(`${API_BASE}/contact`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds for file upload
      });
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error submitting contact form with files:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message 
      };
    }
  },

  // Company Info API
  async getCompanyInfo() {
    try {
      const response = await apiClient.get('/company-info');
      return { 
        success: true, 
        data: response.data.data,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error fetching company info:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: null 
      };
    }
  },

  // Admin APIs (for future use)
  async getQuoteRequests() {
    try {
      const response = await apiClient.get('/admin/quote-requests');
      return { 
        success: true, 
        data: response.data.data?.requests || [],
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message,
        data: [] 
      };
    }
  }
};

export default apiService;