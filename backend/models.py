from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
from datetime import datetime
import uuid

# Service Models
class ServicePricing(BaseModel):
    starting: int
    unit: str

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    features: List[str]
    pricing: ServicePricing
    duration: str
    availability: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    name: str
    description: str
    icon: str
    features: List[str]
    pricing: ServicePricing
    duration: str
    availability: str

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    service: str
    rating: int = Field(ge=1, le=5)
    text: str
    location: str
    date: datetime
    verified: bool = True
    approved: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    service: str
    rating: int = Field(ge=1, le=5)
    text: str
    location: str
    date: Optional[datetime] = None

    @validator('date', pre=True, always=True)
    def set_date(cls, v):
        return v or datetime.utcnow()

# Quote Request Models  
class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: Optional[str] = None
    status: str = "pending"
    estimated_price: Optional[int] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: Optional[str] = None

    @validator('phone')
    def validate_phone(cls, v):
        if v:
            # Remove non-digit characters
            phone_digits = ''.join(filter(str.isdigit, v))
            if len(phone_digits) < 10:
                raise ValueError('Phone number must have at least 10 digits')
        return v

# Contact Submission Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

    @validator('phone')
    def validate_phone(cls, v):
        if v:
            # Remove non-digit characters
            phone_digits = ''.join(filter(str.isdigit, v))
            if len(phone_digits) < 10:
                raise ValueError('Phone number must have at least 10 digits')
        return v

# Company Information Models
class BusinessHours(BaseModel):
    weekdays: str
    saturday: str
    sunday: str

class SocialMedia(BaseModel):
    facebook: str
    twitter: str
    instagram: str

class CompanyStats(BaseModel):
    customers: str
    experience: str
    satisfaction: str
    support: str

class CompanyInfo(BaseModel):
    name: str
    tagline: str
    phone: str
    email: EmailStr
    address: str
    service_radius: str
    business_hours: BusinessHours
    features: List[str]
    stats: CompanyStats
    social_media: SocialMedia

# API Response Models
class APIResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[dict] = None

class ServiceResponse(APIResponse):
    data: Optional[Service] = None

class ServicesResponse(APIResponse):
    data: Optional[List[Service]] = None

class TestimonialsResponse(APIResponse):
    data: Optional[List[Testimonial]] = None

class QuoteRequestResponse(APIResponse):
    data: Optional[QuoteRequest] = None

class CompanyInfoResponse(APIResponse):
    data: Optional[CompanyInfo] = None