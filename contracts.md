# API Contracts - CleanPro Services

## Backend Implementation Plan

### Current Mock Data in `mock.js`
- Services data (5 services with details)
- Testimonials data (customer reviews)
- Company information
- Quote requests data
- Mock API functions for frontend simulation

### API Endpoints to Implement

#### 1. Services API
```
GET /api/services
- Returns: List of all services
- Response: { data: Service[], success: boolean, message?: string }

GET /api/services/:id  
- Returns: Single service by ID
- Response: { data: Service, success: boolean, message?: string }
```

#### 2. Testimonials API
```
GET /api/testimonials
- Returns: List of customer testimonials
- Response: { data: Testimonial[], success: boolean, message?: string }
```

#### 3. Quote Requests API
```
POST /api/quote-request
- Body: { name, email, phone, service, message }
- Returns: Confirmation and quote ID
- Response: { data: QuoteRequest, success: boolean, message: string }

GET /api/quote-requests (Admin only)
- Returns: List of all quote requests
- Response: { data: QuoteRequest[], success: boolean, message?: string }
```

#### 4. Contact Form API
```
POST /api/contact
- Body: { name, email, phone, service, message }
- Returns: Confirmation
- Response: { success: boolean, message: string }
```

#### 5. Company Information API
```
GET /api/company-info
- Returns: Company details, contact info, business hours
- Response: { data: CompanyInfo, success: boolean, message?: string }
```

### Database Models

#### Service Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  features: [String],
  pricing: {
    starting: Number,
    unit: String
  },
  duration: String,
  availability: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String,
  service: String,
  rating: Number (1-5),
  text: String,
  location: String,
  date: Date,
  verified: Boolean,
  approved: Boolean,
  createdAt: Date
}
```

#### QuoteRequest Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  status: String, // 'pending', 'contacted', 'quoted', 'completed'
  estimatedPrice: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### ContactSubmission Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  status: String, // 'new', 'responded', 'resolved'
  createdAt: Date
}
```

### Frontend Integration Changes

#### Remove Mock Data Usage
- Update service components to use real API calls
- Replace mock data imports with API service calls
- Handle loading states and error handling

#### API Service Layer
Create `/frontend/src/services/api.js`:
- Centralized API calls using axios
- Error handling and response formatting
- Loading state management

#### State Management
- Add loading states for data fetching
- Error handling for failed requests
- Success messages for form submissions

### Implementation Priority
1. Database models and schema setup
2. Services and testimonials API (read-only)
3. Quote request API (form submission)
4. Contact form API
5. Frontend integration and mock data removal
6. Error handling and validation
7. Loading states and user feedback

### Security Considerations
- Input validation for all form submissions
- Email format validation
- Phone number sanitization
- Rate limiting for form submissions
- CORS setup for frontend communication

### Email Integration (Future Enhancement)
- Send confirmation emails for quote requests
- Admin notifications for new submissions
- Auto-response setup for contact forms