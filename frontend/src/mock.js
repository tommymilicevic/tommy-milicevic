// Mock data for CleanPro Services website
// This file contains all the mock data used throughout the application
// In a real application, this data would come from a backend API

export const mockServices = [
  {
    id: 1,
    name: "Pressure Washing",
    description: "Professional pressure washing for driveways, sidewalks, decks, and building exteriors. Remove years of dirt and grime.",
    icon: "droplets",
    features: [
      "Driveways & Sidewalks",
      "Building Exteriors", 
      "Decks & Patios",
      "Eco-friendly Solutions"
    ],
    pricing: {
      starting: 150,
      unit: "per service"
    },
    duration: "2-4 hours",
    availability: "Available daily"
  },
  {
    id: 2,
    name: "Gardening Services",
    description: "Complete garden maintenance including planting, pruning, weeding, and seasonal garden care.",
    icon: "tree-pine",
    features: [
      "Garden Design",
      "Plant Installation",
      "Pruning & Trimming", 
      "Seasonal Maintenance"
    ],
    pricing: {
      starting: 75,
      unit: "per hour"
    },
    duration: "Varies by project",
    availability: "Mon-Sat"
  },
  {
    id: 3,
    name: "Rubbish Removal",
    description: "Fast and reliable waste removal service for household, garden, and construction debris.", 
    icon: "trash-2",
    features: [
      "Household Waste",
      "Garden Debris",
      "Construction Waste",
      "Same Day Pickup"
    ],
    pricing: {
      starting: 100,
      unit: "per load"
    },
    duration: "1-2 hours",
    availability: "Available daily"
  },
  {
    id: 4,
    name: "Gutter Cleaning",
    description: "Thorough gutter cleaning and maintenance to protect your home from water damage.",
    icon: "home",
    features: [
      "Gutter Cleaning",
      "Downspout Clearing",
      "Gutter Repairs",
      "Maintenance Programs"
    ],
    pricing: {
      starting: 120,
      unit: "per service"
    },
    duration: "2-3 hours", 
    availability: "Mon-Sat"
  },
  {
    id: 5,
    name: "Lawn Mowing",
    description: "Regular lawn mowing and grass care to keep your property looking pristine year-round.",
    icon: "scissors",
    features: [
      "Weekly Mowing",
      "Edge Trimming",
      "Grass Care Tips",
      "Seasonal Packages"
    ],
    pricing: {
      starting: 50,
      unit: "per visit"
    },
    duration: "1-2 hours",
    availability: "Mon-Sat"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Pressure Washing & Lawn Care",
    rating: 5,
    text: "CleanPro transformed our driveway and lawn completely! The team was professional, punctual, and the results exceeded our expectations. Highly recommended!",
    location: "Springfield",
    date: "2024-01-15",
    verified: true
  },
  {
    id: 2,
    name: "Mike Chen", 
    service: "Gutter Cleaning & Gardening",
    rating: 5,
    text: "Outstanding service! They cleaned our gutters thoroughly and helped redesign our garden. The attention to detail is impressive. Will definitely use again.",
    location: "Riverside",
    date: "2024-01-10",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    service: "Rubbish Removal",
    rating: 5,
    text: "Fast, efficient, and affordable rubbish removal. They handled our renovation debris professionally and left the area spotless. Great communication throughout.",
    location: "Downtown",
    date: "2024-01-08",
    verified: true
  },
  {
    id: 4,
    name: "David Wilson",
    service: "Pressure Washing",
    rating: 4,
    text: "Great job on the driveway cleaning. Very professional team and fair pricing. The results speak for themselves!",
    location: "Oakwood",
    date: "2024-01-05",
    verified: true
  }
];

export const mockCompanyInfo = {
  name: "CleanPro Services",
  tagline: "Professional Home Services You Can Trust",
  phone: "(555) 123-4567",
  email: "info@cleanproservices.com",
  address: "Greater Metro Area",
  serviceRadius: "25 mile radius",
  businessHours: {
    weekdays: "7AM - 7PM",
    saturday: "7AM - 7PM", 
    sunday: "9AM - 5PM"
  },
  features: [
    "Licensed & Insured",
    "Same Day Service",
    "100% Satisfaction Guarantee"
  ],
  stats: {
    customers: "500+",
    experience: "5+",
    satisfaction: "100%",
    support: "24/7"
  },
  socialMedia: {
    facebook: "#",
    twitter: "#",
    instagram: "#"
  }
};

export const mockQuoteRequests = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 234-5678",
    service: "pressure-washing",
    message: "Need driveway and sidewalk cleaning",
    status: "pending",
    createdAt: "2024-01-20",
    estimatedPrice: 175
  },
  {
    id: 2,
    name: "Lisa Brown",
    email: "lisa@example.com", 
    phone: "(555) 345-6789",
    service: "multiple",
    message: "Interested in lawn mowing and gardening services",
    status: "contacted",
    createdAt: "2024-01-19",
    estimatedPrice: 200
  }
];

// Mock API functions (simulating backend responses)
export const mockApi = {
  // Simulate getting all services
  getServices: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockServices, success: true });
      }, 500);
    });
  },

  // Simulate getting service by ID
  getService: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const service = mockServices.find(s => s.id === parseInt(id));
        if (service) {
          resolve({ data: service, success: true });
        } else {
          reject({ error: "Service not found", success: false });
        }
      }, 300);
    });
  },

  // Simulate getting testimonials
  getTestimonials: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockTestimonials, success: true });
      }, 400);
    });
  },

  // Simulate submitting quote request
  submitQuoteRequest: (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest = {
          id: mockQuoteRequests.length + 1,
          ...formData,
          status: "pending",
          createdAt: new Date().toISOString().split('T')[0],
          estimatedPrice: Math.floor(Math.random() * 300) + 100
        };
        mockQuoteRequests.push(newRequest);
        resolve({ 
          data: newRequest, 
          success: true, 
          message: "Quote request submitted successfully" 
        });
      }, 1000);
    });
  },

  // Simulate getting company info
  getCompanyInfo: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockCompanyInfo, success: true });
      }, 200);
    });
  }
};

export default {
  mockServices,
  mockTestimonials,
  mockCompanyInfo,
  mockQuoteRequests,
  mockApi
};