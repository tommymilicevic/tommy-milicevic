import os
from motor.motor_asyncio import AsyncIOMotorClient
from models import Service, Testimonial, QuoteRequest, ContactSubmission, CompanyInfo
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        
    async def connect(self):
        try:
            mongo_url = os.environ.get('MONGO_URL')
            db_name = os.environ.get('DB_NAME', 'cleanpro_services')
            
            self.client = AsyncIOMotorClient(mongo_url)
            self.db = self.client[db_name]
            
            # Test connection
            await self.db.command('ping')
            logger.info("Successfully connected to MongoDB")
            
            # Initialize collections with sample data if empty
            await self._initialize_data()
            
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise

    async def close(self):
        if self.client:
            self.client.close()

    async def _initialize_data(self):
        """Initialize database with sample data if collections are empty"""
        try:
            # Initialize Services
            services_count = await self.db.services.count_documents({})
            if services_count == 0:
                await self._init_services()
                
            # Initialize Testimonials
            testimonials_count = await self.db.testimonials.count_documents({})
            if testimonials_count == 0:
                await self._init_testimonials()
                
            # TEMPORARILY DISABLE COMPANY INFO AUTO-INIT
            # Initialize Company Info
            # company_count = await self.db.company_info.count_documents({})
            # if company_count == 0:
            #     await self._init_company_info()
            # else:
            #     logger.info(f"Company info already exists ({company_count} documents), skipping initialization")
                
        except Exception as e:
            logger.error(f"Error initializing data: {e}")

    async def _init_services(self):
        """Initialize services collection with sample data"""
        from datetime import datetime
        
        services_data = [
            {
                "name": "Pressure Washing",
                "description": "Professional pressure washing for driveways, sidewalks, decks, and building exteriors. Remove years of dirt and grime.",
                "icon": "droplets",
                "features": ["Driveways & Sidewalks", "Building Exteriors", "Decks & Patios", "Eco-friendly Solutions"],
                "pricing": {"starting": 100, "unit": "starting price"},
                "duration": "2-4 hours",
                "availability": "Available daily",
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Gardening Services",
                "description": "Complete garden maintenance including planting, pruning, weeding, and seasonal garden care.",
                "icon": "tree-pine",
                "features": ["Garden Design", "Plant Installation", "Pruning & Trimming", "Seasonal Maintenance"],
                "pricing": {"starting": 50, "unit": "starting price"},
                "duration": "Varies by project",
                "availability": "Mon-Sat",
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Rubbish Removal",
                "description": "Fast and reliable waste removal service for household, garden, and construction debris.",
                "icon": "trash-2",
                "features": ["Household Waste", "Garden Debris", "Construction Waste", "Same Day Pickup"],
                "pricing": {"starting": 80, "unit": "starting price"},
                "duration": "1-2 hours",
                "availability": "Available daily",
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Gutter Cleaning",
                "description": "Thorough gutter cleaning and maintenance to protect your home from water damage.",
                "icon": "home",
                "features": ["Gutter Cleaning", "Downspout Clearing", "Gutter Repairs", "Maintenance Programs"],
                "pricing": {"starting": 95, "unit": "starting price"},
                "duration": "2-3 hours",
                "availability": "Mon-Sat",
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Lawn Mowing",
                "description": "Regular lawn mowing and grass care to keep your property looking pristine year-round.",
                "icon": "scissors",
                "features": ["Weekly Mowing", "Edge Trimming", "Grass Care Tips", "Seasonal Packages"],
                "pricing": {"starting": 50, "unit": "per visit"},
                "duration": "1-2 hours",
                "availability": "Mon-Sat",
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        await self.db.services.insert_many(services_data)
        logger.info("Initialized services data")

    async def _init_testimonials(self):
        """Initialize testimonials collection with sample data"""
        from datetime import datetime, timedelta
        import random
        
        testimonials_data = [
            {
                "name": "Sarah Mitchell",
                "service": "Pressure Washing",
                "rating": 4,
                "text": "Great job cleaning our driveway in Coombs. The team was punctual and professional. Removed all the dirt and stains perfectly.",
                "location": "Coombs",
                "date": datetime.utcnow() - timedelta(days=3),
                "verified": True,
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Michael Chen",
                "service": "Gutter Cleaning",
                "rating": 4,
                "text": "Aurex Exteriors did an excellent job with our gutters in Philip. Very thorough and cleaned up after themselves. Good value for money.",
                "location": "Philip",
                "date": datetime.utcnow() - timedelta(days=7),
                "verified": True,
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Emma Rodriguez",
                "service": "Gardening Services",
                "rating": 5,
                "text": "Fantastic garden maintenance service in Gordon. They transformed our backyard and gave us great advice for ongoing care.",
                "location": "Gordon",
                "date": datetime.utcnow() - timedelta(days=10),
                "verified": True,
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "James Wilson",
                "service": "Rubbish Removal",
                "rating": 4,
                "text": "Quick and efficient rubbish removal in Richardson. They handled our renovation debris professionally and the pricing was fair.",
                "location": "Richardson",
                "date": datetime.utcnow() - timedelta(days=14),
                "verified": True,
                "approved": True,
                "created_at": datetime.utcnow()
            }
        ]
        
        await self.db.testimonials.insert_many(testimonials_data)
        logger.info("Initialized testimonials data")

    async def _init_company_info(self):
        """Initialize company info collection"""
        company_data = {
            "name": "Aurex Exteriors",
            "tagline": "Professional Exterior Services You Can Trust",
            "phone": "Mo: 0424 910 154, Tom: 0450515119",
            "email": "AurexExteriors@gmail.com",
            "address": "Canberra, Australian Capital Territory (ACT)",
            "service_radius": "2600-2617 postcode areas",
            "business_hours": {
                "weekdays": "7AM - 7PM",
                "saturday": "7AM - 7PM",
                "sunday": "9AM - 5PM"
            },
            "contacts": [
                {
                    "name": "Mo",
                    "phone": "0424 910 154",
                    "role": "Owner"
                },
                {
                    "name": "Tom", 
                    "phone": "0450515119",
                    "role": "Owner"
                }
            ],
            "features": [
                "Fully Insured",
                "Same Day Service",
                "100% Satisfaction Guarantee"
            ],
            "stats": {
                "customers": "50+",
                "experience": "2+",
                "satisfaction": "100%",
                "support": "24/7"
            },
            "social_media": {
                "facebook": "#",
                "twitter": "#",
                "instagram": "https://www.instagram.com/aurexexteriors"
            }
        }
        
        await self.db.company_info.insert_one(company_data)
        logger.info("Initialized company info data")

    # Services CRUD
    async def get_services(self) -> List[dict]:
        cursor = self.db.services.find({"active": True})
        services = await cursor.to_list(length=100)
        return services

    async def get_service_by_id(self, service_id: str) -> Optional[dict]:
        from bson import ObjectId
        try:
            # Try to convert to ObjectId if it's a valid ObjectId string
            if ObjectId.is_valid(service_id):
                service = await self.db.services.find_one({"_id": ObjectId(service_id), "active": True})
            else:
                # Fallback to string search for UUID-based IDs
                service = await self.db.services.find_one({"_id": service_id, "active": True})
            return service
        except Exception:
            return None

    # Testimonials CRUD
    async def get_testimonials(self) -> List[dict]:
        cursor = self.db.testimonials.find({"approved": True}).sort("created_at", -1)
        testimonials = await cursor.to_list(length=100)
        return testimonials

    # Quote Requests CRUD
    async def create_quote_request(self, quote_data: dict) -> dict:
        result = await self.db.quote_requests.insert_one(quote_data)
        quote_data['_id'] = str(result.inserted_id)
        return quote_data

    async def get_quote_requests(self) -> List[dict]:
        cursor = self.db.quote_requests.find().sort("created_at", -1)
        requests = await cursor.to_list(length=1000)
        return requests

    # Contact Submissions CRUD
    async def create_contact_submission(self, contact_data: dict) -> dict:
        result = await self.db.contact_submissions.insert_one(contact_data)
        contact_data['_id'] = str(result.inserted_id)
        return contact_data

    # Company Info
    async def get_company_info(self) -> Optional[dict]:
        company_info = await self.db.company_info.find_one()
        return company_info

# Global database instance
database = Database()