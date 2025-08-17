import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Optional
from fastapi import UploadFile
import tempfile
import mimetypes
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_username = os.environ.get('SMTP_USERNAME')
        self.smtp_password = os.environ.get('SMTP_PASSWORD')
        self.sender_email = os.environ.get('SENDER_EMAIL')
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL')
        
        # Validate required environment variables
        if not all([self.smtp_username, self.smtp_password, self.sender_email, self.recipient_email]):
            logger.warning(f"Missing email config: username={bool(self.smtp_username)}, password={bool(self.smtp_password)}, sender={bool(self.sender_email)}, recipient={bool(self.recipient_email)}")
            raise ValueError("Missing required email configuration. Please check environment variables.")
    
    async def send_contact_email(
        self, 
        name: str, 
        email: str, 
        phone: Optional[str], 
        service: str, 
        message: str, 
        photos: List[UploadFile] = None
    ) -> bool:
        """
        Send contact form submission via email with optional photo attachments
        """
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = self.recipient_email
            msg['Subject'] = f"New Contact Form Submission from {name}"
            
            # Create email body
            body = f"""
            New contact form submission received:
            
            Name: {name}
            Email: {email}
            Phone: {phone or 'Not provided'}
            Service: {service}
            
            Message:
            {message}
            
            ---
            Submitted from Aurex Exteriors website
            """
            
            # Attach body to email
            msg.attach(MIMEText(body, 'plain'))
            
            # Handle photo attachments if provided
            if photos:
                for photo in photos:
                    if photo.filename:
                        await self._attach_photo(msg, photo)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Contact email sent successfully for {name} ({email})")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            return False
    
    async def _attach_photo(self, msg: MIMEMultipart, photo: UploadFile):
        """
        Attach a photo file to the email message
        """
        try:
            # Read file content
            content = await photo.read()
            
            # Reset file pointer for potential re-use
            await photo.seek(0)
            
            # Determine MIME type
            content_type, _ = mimetypes.guess_type(photo.filename)
            if not content_type:
                content_type = 'application/octet-stream'
            
            main_type, sub_type = content_type.split('/', 1)
            
            # Create attachment
            attachment = MIMEBase(main_type, sub_type)
            attachment.set_payload(content)
            encoders.encode_base64(attachment)
            
            # Add header with filename
            attachment.add_header(
                'Content-Disposition',
                f'attachment; filename="{photo.filename}"'
            )
            
            # Attach to message
            msg.attach(attachment)
            
            logger.info(f"Photo attachment added: {photo.filename}")
            
        except Exception as e:
            logger.error(f"Failed to attach photo {photo.filename}: {str(e)}")
    
    def test_connection(self) -> bool:
        """
        Test SMTP connection and authentication
        """
        try:
            logger.info(f"Testing SMTP connection to {self.smtp_server}:{self.smtp_port}")
            logger.info(f"Using username: {self.smtp_username}")
            logger.info(f"Password length: {len(self.smtp_password)} characters")
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.set_debuglevel(1)  # Enable debug output
                logger.info("Starting TLS...")
                server.starttls()
                logger.info("Attempting login...")
                server.login(self.smtp_username, self.smtp_password)
                logger.info("SMTP connection test successful")
                return True
        except Exception as e:
            logger.error(f"SMTP connection test failed: {str(e)}")
            logger.error(f"Error type: {type(e)}")
            return False

# Create global email service instance
email_service = EmailService()