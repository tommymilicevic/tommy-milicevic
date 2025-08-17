from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from datetime import datetime
import random

# Import models and database
from models import (
    Service, ServiceResponse, ServicesResponse,
    Testimonial, TestimonialsResponse,
    QuoteRequest, QuoteRequestCreate, QuoteRequestResponse,
    ContactSubmission, ContactSubmissionCreate,
    CompanyInfo, CompanyInfoResponse,
    APIResponse
)
from database import database

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Aurex Exteriors API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await database.connect()
    logger.info("CleanPro Services API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    await database.close()
    logger.info("CleanPro Services API shut down")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "CleanPro Services API is running", "status": "healthy"}

# Services endpoints
@api_router.get("/services", response_model=ServicesResponse)
async def get_services():
    try:
        services_data = await database.get_services()
        
        services = []
        for service_doc in services_data:
            # Convert MongoDB document to Service model
            service_dict = {
                "id": str(service_doc.get("_id", service_doc.get("id", ""))),
                "name": service_doc["name"],
                "description": service_doc["description"],
                "icon": service_doc["icon"],
                "features": service_doc["features"],
                "pricing": service_doc["pricing"],
                "duration": service_doc["duration"],
                "availability": service_doc["availability"],
                "active": service_doc.get("active", True),
                "created_at": service_doc.get("created_at", datetime.utcnow()),
                "updated_at": service_doc.get("updated_at", datetime.utcnow())
            }
            services.append(Service(**service_dict))
        
        return ServicesResponse(
            success=True,
            message="Services retrieved successfully",
            data=services
        )
    except Exception as e:
        logger.error(f"Error getting services: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve services"
        )

@api_router.get("/services/{service_id}", response_model=ServiceResponse)
async def get_service(service_id: str):
    try:
        service_doc = await database.get_service_by_id(service_id)
        
        if not service_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        service_dict = {
            "id": str(service_doc.get("_id", service_doc.get("id", ""))),
            "name": service_doc["name"],
            "description": service_doc["description"],
            "icon": service_doc["icon"],
            "features": service_doc["features"],
            "pricing": service_doc["pricing"],
            "duration": service_doc["duration"],
            "availability": service_doc["availability"],
            "active": service_doc.get("active", True),
            "created_at": service_doc.get("created_at", datetime.utcnow()),
            "updated_at": service_doc.get("updated_at", datetime.utcnow())
        }
        
        service = Service(**service_dict)
        
        return ServiceResponse(
            success=True,
            message="Service retrieved successfully",
            data=service
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting service {service_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve service"
        )

# Testimonials endpoints
@api_router.get("/testimonials", response_model=TestimonialsResponse)
async def get_testimonials():
    try:
        testimonials_data = await database.get_testimonials()
        
        testimonials = []
        for testimonial_doc in testimonials_data:
            testimonial_dict = {
                "id": str(testimonial_doc.get("_id", testimonial_doc.get("id", ""))),
                "name": testimonial_doc["name"],
                "service": testimonial_doc["service"],
                "rating": testimonial_doc["rating"],
                "text": testimonial_doc["text"],
                "location": testimonial_doc["location"],
                "date": testimonial_doc["date"],
                "verified": testimonial_doc.get("verified", True),
                "approved": testimonial_doc.get("approved", True),
                "created_at": testimonial_doc.get("created_at", datetime.utcnow())
            }
            testimonials.append(Testimonial(**testimonial_dict))
        
        return TestimonialsResponse(
            success=True,
            message="Testimonials retrieved successfully",
            data=testimonials
        )
    except Exception as e:
        logger.error(f"Error getting testimonials: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve testimonials"
        )

# Quote request endpoints
@api_router.post("/quote-request", response_model=QuoteRequestResponse)
async def create_quote_request(quote_request: QuoteRequestCreate):
    try:
        # Create quote request with additional fields
        quote_data = quote_request.dict()
        quote_data.update({
            "status": "pending",
            "estimated_price": random.randint(100, 500),  # Random estimate for demo
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        
        # Save to database
        saved_quote = await database.create_quote_request(quote_data)
        
        # Convert to response model
        quote_response = QuoteRequest(**{
            "id": str(saved_quote.get("_id", saved_quote.get("id", ""))),
            "name": saved_quote["name"],
            "email": saved_quote["email"],
            "phone": saved_quote.get("phone"),
            "service": saved_quote["service"],
            "message": saved_quote.get("message"),
            "status": saved_quote["status"],
            "estimated_price": saved_quote.get("estimated_price"),
            "notes": saved_quote.get("notes"),
            "created_at": saved_quote["created_at"],
            "updated_at": saved_quote["updated_at"]
        })
        
        return QuoteRequestResponse(
            success=True,
            message="Quote request submitted successfully! We'll contact you within 24 hours.",
            data=quote_response
        )
    except Exception as e:
        logger.error(f"Error creating quote request: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit quote request"
        )

# Contact form endpoint
@api_router.post("/contact", response_model=APIResponse)
async def create_contact_submission(contact: ContactSubmissionCreate):
    try:
        # Create contact submission
        contact_data = contact.dict()
        contact_data.update({
            "status": "new",
            "created_at": datetime.utcnow()
        })
        
        # Save to database
        await database.create_contact_submission(contact_data)
        
        return APIResponse(
            success=True,
            message="Thank you for contacting us! We'll respond within 2 hours."
        )
    except Exception as e:
        logger.error(f"Error creating contact submission: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact form"
        )

# Company info endpoint
@api_router.get("/company-info", response_model=CompanyInfoResponse)
async def get_company_info():
    try:
        company_data = await database.get_company_info()
        
        # Debug logging
        logger.info(f"Retrieved company data from DB: address={company_data.get('address') if company_data else 'None'}")
        
        if not company_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company information not found"
            )
        
        company_info = CompanyInfo(**{
            "name": company_data["name"],
            "tagline": company_data["tagline"],
            "phone": company_data["phone"],
            "email": company_data["email"],
            "address": company_data["address"],
            "service_radius": company_data["service_radius"],
            "business_hours": company_data["business_hours"],
            "features": company_data["features"],
            "stats": company_data["stats"],
            "social_media": company_data["social_media"]
        })
        
        logger.info(f"Returning company info: address={company_info.address}")
        
        return CompanyInfoResponse(
            success=True,
            message="Company information retrieved successfully",
            data=company_info
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting company info: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve company information"
        )

# Admin endpoints (for future use)
@api_router.get("/admin/quote-requests")
async def get_all_quote_requests():
    try:
        requests = await database.get_quote_requests()
        return APIResponse(
            success=True,
            message="Quote requests retrieved successfully",
            data={"requests": requests}
        )
    except Exception as e:
        logger.error(f"Error getting quote requests: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve quote requests"
        )

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)