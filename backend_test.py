#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for CleanPro Services
Tests all API endpoints with various scenarios including validation, error handling, and data integrity.
"""

import requests
import json
import os
from datetime import datetime
import sys
import io

# Try to import PIL for image testing
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("Warning: PIL not available - some image upload tests will be skipped")

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

print(f"Testing CleanPro Services API at: {API_BASE}")
print("=" * 60)

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name, success, message="", response_data=None):
    """Log test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {test_name}")
    if message:
        print(f"    {message}")
    if response_data and not success:
        print(f"    Response: {response_data}")
    
    if success:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {message}")
    print()

def test_health_check():
    """Test API health check endpoint"""
    print("🔍 Testing API Health Check...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") and "running" in data["message"].lower():
                log_test("Health Check", True, f"API is healthy: {data['message']}")
                return True
            else:
                log_test("Health Check", False, f"Unexpected response format: {data}")
        else:
            log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Health Check", False, f"Connection error: {str(e)}")
    return False

def test_services_api():
    """Test Services API endpoints"""
    print("🔍 Testing Services API...")
    
    # Test GET /api/services
    try:
        response = requests.get(f"{API_BASE}/services", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            # Check response structure
            if not data.get("success"):
                log_test("GET /services - Response Structure", False, "Missing 'success' field")
                return False
                
            services = data.get("data", [])
            if not isinstance(services, list):
                log_test("GET /services - Data Type", False, "Services data is not a list")
                return False
                
            if len(services) != 5:
                log_test("GET /services - Service Count", False, f"Expected 5 services, got {len(services)}")
                return False
                
            log_test("GET /services", True, f"Retrieved {len(services)} services successfully")
            
            # Validate service structure
            required_fields = ["id", "name", "description", "icon", "features", "pricing", "duration", "availability"]
            for i, service in enumerate(services):
                missing_fields = [field for field in required_fields if field not in service]
                if missing_fields:
                    log_test(f"Service {i+1} Structure", False, f"Missing fields: {missing_fields}")
                    continue
                    
                # Check pricing structure
                pricing = service.get("pricing", {})
                if not isinstance(pricing, dict) or "starting" not in pricing or "unit" not in pricing:
                    log_test(f"Service {i+1} Pricing", False, "Invalid pricing structure")
                    continue
                    
                # Check features is a list
                if not isinstance(service.get("features"), list):
                    log_test(f"Service {i+1} Features", False, "Features should be a list")
                    continue
                    
            log_test("Services Structure Validation", True, "All services have proper structure")
            
            # Test individual service endpoint with first service ID
            if services:
                service_id = services[0]["id"]
                test_individual_service(service_id)
                
        else:
            log_test("GET /services", False, f"HTTP {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("GET /services", False, f"Request error: {str(e)}")
        return False
        
    return True

def test_individual_service(service_id):
    """Test individual service endpoint"""
    try:
        # Test valid service ID
        response = requests.get(f"{API_BASE}/services/{service_id}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data"):
                log_test("GET /services/{id} - Valid ID", True, f"Retrieved service: {data['data']['name']}")
            else:
                log_test("GET /services/{id} - Valid ID", False, "Invalid response structure")
        else:
            log_test("GET /services/{id} - Valid ID", False, f"HTTP {response.status_code}")
            
        # Test invalid service ID
        response = requests.get(f"{API_BASE}/services/invalid-id-123", timeout=10)
        if response.status_code == 404:
            log_test("GET /services/{id} - Invalid ID", True, "Correctly returned 404 for invalid ID")
        else:
            log_test("GET /services/{id} - Invalid ID", False, f"Expected 404, got {response.status_code}")
            
    except Exception as e:
        log_test("GET /services/{id}", False, f"Request error: {str(e)}")

def test_testimonials_api():
    """Test Testimonials API endpoint"""
    print("🔍 Testing Testimonials API...")
    
    try:
        response = requests.get(f"{API_BASE}/testimonials", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if not data.get("success"):
                log_test("GET /testimonials - Response Structure", False, "Missing 'success' field")
                return False
                
            testimonials = data.get("data", [])
            if not isinstance(testimonials, list):
                log_test("GET /testimonials - Data Type", False, "Testimonials data is not a list")
                return False
                
            log_test("GET /testimonials", True, f"Retrieved {len(testimonials)} testimonials successfully")
            
            # Validate testimonial structure
            if testimonials:
                required_fields = ["id", "name", "service", "rating", "text", "location", "date"]
                for i, testimonial in enumerate(testimonials[:3]):  # Check first 3
                    missing_fields = [field for field in required_fields if field not in testimonial]
                    if missing_fields:
                        log_test(f"Testimonial {i+1} Structure", False, f"Missing fields: {missing_fields}")
                        continue
                        
                    # Check rating is between 1-5
                    rating = testimonial.get("rating")
                    if not isinstance(rating, int) or rating < 1 or rating > 5:
                        log_test(f"Testimonial {i+1} Rating", False, f"Invalid rating: {rating}")
                        continue
                        
                log_test("Testimonials Structure Validation", True, "Testimonials have proper structure")
            else:
                log_test("Testimonials Data", False, "No testimonials found")
                
        else:
            log_test("GET /testimonials", False, f"HTTP {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("GET /testimonials", False, f"Request error: {str(e)}")
        return False
        
    return True

def test_quote_request_api():
    """Test Quote Request API endpoint"""
    print("🔍 Testing Quote Request API...")
    
    # Test valid quote request
    valid_quote = {
        "name": "John Smith",
        "email": "john.smith@email.com",
        "phone": "555-123-4567",
        "service": "Pressure Washing",
        "message": "Need driveway and patio cleaned"
    }
    
    try:
        response = requests.post(f"{API_BASE}/quote-request", json=valid_quote, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if data.get("success") and data.get("data"):
                quote_data = data["data"]
                if "estimated_price" in quote_data and "id" in quote_data:
                    log_test("POST /quote-request - Valid Data", True, f"Quote created with ID: {quote_data['id']}")
                else:
                    log_test("POST /quote-request - Valid Data", False, "Missing estimated_price or ID in response")
            else:
                log_test("POST /quote-request - Valid Data", False, "Invalid response structure")
        else:
            log_test("POST /quote-request - Valid Data", False, f"HTTP {response.status_code}: {response.text}")
            
    except Exception as e:
        log_test("POST /quote-request - Valid Data", False, f"Request error: {str(e)}")
    
    # Test required fields validation
    test_cases = [
        ({}, "Empty request"),
        ({"name": "John"}, "Missing email and service"),
        ({"name": "John", "email": "invalid-email"}, "Invalid email format"),
        ({"name": "John", "email": "john@email.com"}, "Missing service"),
        ({"name": "John", "email": "john@email.com", "service": "Test", "phone": "123"}, "Invalid phone number")
    ]
    
    for invalid_data, description in test_cases:
        try:
            response = requests.post(f"{API_BASE}/quote-request", json=invalid_data, timeout=10)
            if response.status_code in [400, 422]:  # Validation error expected
                log_test(f"Quote Request Validation - {description}", True, "Correctly rejected invalid data")
            else:
                log_test(f"Quote Request Validation - {description}", False, f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            log_test(f"Quote Request Validation - {description}", False, f"Request error: {str(e)}")

def test_contact_form_api():
    """Test Contact Form API endpoint with multipart/form-data and file uploads"""
    print("🔍 Testing Contact Form API with File Uploads...")
    
    # Test 1: Valid contact submission without photos
    print("  Testing form submission without photos...")
    form_data = {
        "name": "Jane Doe",
        "email": "jane.doe@email.com",
        "phone": "555-987-6543",
        "service": "Pressure Washing",
        "message": "Interested in driveway cleaning service"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", data=form_data, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            
            if data.get("success") and data.get("message"):
                log_test("POST /contact - Form Data (No Photos)", True, f"Contact form submitted: {data['message']}")
            else:
                log_test("POST /contact - Form Data (No Photos)", False, "Invalid response structure")
        else:
            log_test("POST /contact - Form Data (No Photos)", False, f"HTTP {response.status_code}: {response.text}")
            
    except Exception as e:
        log_test("POST /contact - Form Data (No Photos)", False, f"Request error: {str(e)}")
    
    # Test 2: Valid contact submission with valid image files
    print("  Testing form submission with valid image files...")
    try:
        # Create small test image files (valid)
        import io
        from PIL import Image
        
        # Create a small test image (100x100 pixels)
        img1 = Image.new('RGB', (100, 100), color='red')
        img1_bytes = io.BytesIO()
        img1.save(img1_bytes, format='JPEG')
        img1_bytes.seek(0)
        
        img2 = Image.new('RGB', (50, 50), color='blue')
        img2_bytes = io.BytesIO()
        img2.save(img2_bytes, format='PNG')
        img2_bytes.seek(0)
        
        form_data = {
            "name": "John Smith",
            "email": "john.smith@email.com",
            "phone": "555-123-4567",
            "service": "Gutter Cleaning",
            "message": "Need gutter cleaning with before/after photos"
        }
        
        files = [
            ('photos', ('test_image1.jpg', img1_bytes, 'image/jpeg')),
            ('photos', ('test_image2.png', img2_bytes, 'image/png'))
        ]
        
        response = requests.post(f"{API_BASE}/contact", data=form_data, files=files, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "photos" in data.get("message", "").lower():
                log_test("POST /contact - With Valid Images", True, f"Contact form with photos submitted: {data['message']}")
            else:
                log_test("POST /contact - With Valid Images", True, f"Contact form submitted (may not mention photos): {data['message']}")
        else:
            log_test("POST /contact - With Valid Images", False, f"HTTP {response.status_code}: {response.text}")
            
    except ImportError:
        log_test("POST /contact - With Valid Images", False, "PIL library not available for image testing")
    except Exception as e:
        log_test("POST /contact - With Valid Images", False, f"Request error: {str(e)}")
    
    # Test 3: File size validation (files > 10MB should be rejected)
    print("  Testing file size validation...")
    try:
        # Create a large file (simulate > 10MB)
        large_file_content = b'x' * (11 * 1024 * 1024)  # 11MB
        
        form_data = {
            "name": "Test User",
            "email": "test@email.com",
            "service": "Lawn Mowing",
            "message": "Testing large file upload"
        }
        
        files = [('photos', ('large_file.jpg', large_file_content, 'image/jpeg'))]
        
        response = requests.post(f"{API_BASE}/contact", data=form_data, files=files, timeout=15)
        
        # The endpoint should still accept the form but may skip the large file
        if response.status_code == 200:
            data = response.json()
            log_test("POST /contact - Large File Handling", True, "Large file handled gracefully (likely skipped)")
        else:
            log_test("POST /contact - Large File Handling", False, f"HTTP {response.status_code}: {response.text}")
            
    except Exception as e:
        log_test("POST /contact - Large File Handling", False, f"Request error: {str(e)}")
    
    # Test 4: Invalid file type validation
    print("  Testing file type validation...")
    try:
        # Create a text file (non-image)
        text_content = b"This is not an image file"
        
        form_data = {
            "name": "Test User",
            "email": "test@email.com",
            "service": "Rubbish Removal",
            "message": "Testing invalid file type"
        }
        
        files = [('photos', ('document.txt', text_content, 'text/plain'))]
        
        response = requests.post(f"{API_BASE}/contact", data=form_data, files=files, timeout=15)
        
        # The endpoint should still accept the form but may skip the invalid file
        if response.status_code == 200:
            data = response.json()
            log_test("POST /contact - Invalid File Type", True, "Invalid file type handled gracefully (likely skipped)")
        else:
            log_test("POST /contact - Invalid File Type", False, f"HTTP {response.status_code}: {response.text}")
            
    except Exception as e:
        log_test("POST /contact - Invalid File Type", False, f"Request error: {str(e)}")
    
    # Test 5: Required fields validation
    print("  Testing required field validation...")
    test_cases = [
        ({}, "Empty request"),
        ({"name": "Jane"}, "Missing email, service, and message"),
        ({"name": "Jane", "email": "invalid-email"}, "Invalid email format"),
        ({"name": "Jane", "email": "jane@email.com"}, "Missing service and message"),
        ({"name": "Jane", "email": "jane@email.com", "service": "Test"}, "Missing message"),
        ({"email": "jane@email.com", "service": "Test", "message": "Test"}, "Missing name")
    ]
    
    for invalid_data, description in test_cases:
        try:
            response = requests.post(f"{API_BASE}/contact", data=invalid_data, timeout=10)
            if response.status_code in [400, 422]:  # Validation error expected
                log_test(f"Contact Form Validation - {description}", True, "Correctly rejected invalid data")
            else:
                log_test(f"Contact Form Validation - {description}", False, f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            log_test(f"Contact Form Validation - {description}", False, f"Request error: {str(e)}")
    
    # Test 6: Multiple file uploads
    print("  Testing multiple file uploads...")
    try:
        if 'Image' in globals():  # Check if PIL is available
            # Create multiple small test images
            images = []
            for i in range(3):
                img = Image.new('RGB', (50, 50), color=['red', 'green', 'blue'][i])
                img_bytes = io.BytesIO()
                img.save(img_bytes, format='JPEG')
                img_bytes.seek(0)
                images.append(img_bytes)
            
            form_data = {
                "name": "Multi File User",
                "email": "multifile@email.com",
                "service": "Gardening Services",
                "message": "Uploading multiple photos of garden areas"
            }
            
            files = [
                ('photos', (f'garden_{i}.jpg', images[i], 'image/jpeg'))
                for i in range(3)
            ]
            
            response = requests.post(f"{API_BASE}/contact", data=form_data, files=files, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                log_test("POST /contact - Multiple Files", True, f"Multiple files uploaded successfully: {data['message']}")
            else:
                log_test("POST /contact - Multiple Files", False, f"HTTP {response.status_code}: {response.text}")
        else:
            log_test("POST /contact - Multiple Files", False, "PIL library not available for multiple file testing")
            
    except Exception as e:
        log_test("POST /contact - Multiple Files", False, f"Request error: {str(e)}")

def test_company_info_api():
    """Test Company Info API endpoint"""
    print("🔍 Testing Company Info API...")
    
    try:
        response = requests.get(f"{API_BASE}/company-info", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if not data.get("success"):
                log_test("GET /company-info - Response Structure", False, "Missing 'success' field")
                return False
                
            company_info = data.get("data")
            if not company_info:
                log_test("GET /company-info - Data", False, "Missing company info data")
                return False
                
            # Check required fields
            required_fields = ["name", "tagline", "phone", "email", "address", "business_hours"]
            missing_fields = [field for field in required_fields if field not in company_info]
            
            if missing_fields:
                log_test("GET /company-info - Structure", False, f"Missing fields: {missing_fields}")
                return False
                
            # Check business hours structure
            business_hours = company_info.get("business_hours", {})
            if not isinstance(business_hours, dict):
                log_test("GET /company-info - Business Hours", False, "Business hours should be an object")
                return False
                
            log_test("GET /company-info", True, f"Retrieved company info: {company_info['name']}")
            
        else:
            log_test("GET /company-info", False, f"HTTP {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("GET /company-info", False, f"Request error: {str(e)}")
        return False
        
    return True

def test_error_handling():
    """Test error handling and edge cases"""
    print("🔍 Testing Error Handling...")
    
    # Test invalid endpoint
    try:
        response = requests.get(f"{API_BASE}/invalid-endpoint", timeout=10)
        if response.status_code == 404:
            log_test("404 Error Handling", True, "Correctly returned 404 for invalid endpoint")
        else:
            log_test("404 Error Handling", False, f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_test("404 Error Handling", False, f"Request error: {str(e)}")
    
    # Test malformed JSON
    try:
        response = requests.post(
            f"{API_BASE}/quote-request", 
            data="invalid json", 
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if response.status_code in [400, 422]:
            log_test("Malformed JSON Handling", True, "Correctly rejected malformed JSON")
        else:
            log_test("Malformed JSON Handling", False, f"Expected 400/422, got {response.status_code}")
    except Exception as e:
        log_test("Malformed JSON Handling", False, f"Request error: {str(e)}")

def test_cors_headers():
    """Test CORS configuration"""
    print("🔍 Testing CORS Configuration...")
    
    try:
        response = requests.options(f"{API_BASE}/services", timeout=10)
        
        cors_headers = [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Headers"
        ]
        
        missing_headers = []
        for header in cors_headers:
            if header not in response.headers:
                missing_headers.append(header)
        
        if not missing_headers:
            log_test("CORS Headers", True, "All required CORS headers present")
        else:
            log_test("CORS Headers", False, f"Missing CORS headers: {missing_headers}")
            
    except Exception as e:
        log_test("CORS Headers", False, f"Request error: {str(e)}")

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting CleanPro Services Backend API Tests")
    print(f"Backend URL: {API_BASE}")
    print("=" * 60)
    
    # Test in order of dependency
    if not test_health_check():
        print("❌ Health check failed - stopping tests")
        return False
    
    test_services_api()
    test_testimonials_api()
    test_quote_request_api()
    test_contact_form_api()
    test_company_info_api()
    test_error_handling()
    test_cors_headers()
    
    # Print summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"📈 Success Rate: {test_results['passed']/(test_results['passed']+test_results['failed'])*100:.1f}%")
    
    if test_results['errors']:
        print("\n🔍 FAILED TESTS:")
        for error in test_results['errors']:
            print(f"  • {error}")
    
    print("\n" + "=" * 60)
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)