## SecurePathway

## Overview
SecurePathway is a full-stack application designed to enhance **women's safety** by providing features such as identifying the safest path, detecting deepfake media, SOS calling, and managing emergency contacts. The project integrates machine learning, real-time data processing, and a user-friendly interface to ensure a comprehensive safety solution.

---
Key Features and Benefits
1. Safety-First Navigation
Intelligent Route Planning: Algorithms that prioritize well-lit, populated, and positively reviewed paths
Safety Reviews Along Routes: Color-coded markers showing community safety ratings directly on your path
Time-Based Area Mapping: Visualize safely reachable areas within your preferred time frame
Multiple Transportation Modes: Customized safety routes for walking, cycling, and driving

2. Comprehensive Emergency Response
One-Touch SOS Activation: Instantly trigger alerts with a single tap
Multi-Channel Alerts: Simultaneously sends *SMS* messages, *emails*, and initiates *phone calls*
Precise Location Sharing: Automatically includes Google Maps links with exact coordinates
The sos can get triggered by hearing the word 'Help' also if microphone permission is allowed.
Fallback Mechanisms: Works even when precise location services are unavailable

3. Deepfake Detection Technology
User-Friendly Analysis: Simple upload interface for quick media verification
Advanced AI Processing: Powered by a SqueezeNet machine learning model
Privacy-Focused: All processing happens securely without storing sensitive media
Immediate Results: Get verification outcomes within seconds

4. Community Safety Network
Area Safety Reviews: Submit and view safety ratings for specific locations
Crowdsourced Intelligence: Benefit from the collective safety knowledge of the community
Real-Time Updates: Safety information reflects current conditions reported by users

5. User-Centric Design
Intuitive Interface: Clean, accessible design requiring minimal training
Cross-Platform Compatibility: Responsive design works across devices
Customizable Settings: Personalize alerts, contacts, and safety preferences
Privacy Controls: Manage your data and location sharing preferences
SecurePathway transforms how women approach personal safety by combining cutting-edge technology with practical safety features in one comprehensive solution.

---
What Problem Our Project Solves?

SecurePathway addresses critical safety challenges faced by women in their daily lives through an integrated technology solution:

Navigation Vulnerability: Traditional navigation apps prioritize speed over safety. SecurePathway provides routes that consider safety factors, integrating community safety reports and real-time data.

Emergency Response Delays: During emergencies, victims often struggle to quickly contact multiple people or share their precise location. Our SOS system instantly notifies emergency contacts through multiple channels with exact coordinates.

Digital Safety Threats: The rise of deepfake technology creates new risks for harassment and misinformation. Our integrated detection tool helps users verify the authenticity of media they receive.

Fragmented Safety Solutions: Most existing safety apps focus on just one aspect of personal safety. SecurePathway combines route planning, emergency response, and media verification in a single, intuitive platform.

Information Gap: Women often lack reliable, community-verified information about the safety of specific areas. Our review system creates a crowdsourced safety map based on real experiences.


## Dependencies

### Node.js 
dependencies" 
  "axios": "^1.8.3",          // HTTP client for API requests
  "base64-js": "^1.5.1",      // Base64 encoding/decoding
  "bcryptjs": "^3.0.2",       // Password hashing
  "body-parser": "^2.2.0",    // Request body parsing
  "cors": "^2.8.5",           // Cross-Origin Resource Sharing
  "dotenv": "^16.4.7",        // Environment variables management
  "express": "^4.21.2",       // Web framework
  "mongodb": "^6.15.0",       // MongoDB driver
  "mongoose": "^8.12.1",      // MongoDB object modeling
  "multer": "^1.4.5-lts.2",   // File upload handling
  "nodemailer": "^6.10.0",    // Email sending functionality
  "twilio": "^5.5.1"          // SMS and phone call functionality

devDependencies: 
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.23.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "postcss": "^8.5.3"


### Python
python-dotenv    # Environment variables management
pymongo          # MongoDB driver for Python
fastapi          # API framework
uvicorn          # ASGI server
torch            # PyTorch for deep learning
torchvision      # Computer vision in PyTorch
pillow           # Image processing


### Frontend
dependencies: 
  "@headlessui/react": "^1.7.19",   // Unstyled UI components
  "@heroicons/react": "^2.2.0",     // SVG icons
  "axios": "^1.8.4",                // HTTP client
  "date-fns": "^4.1.0",             // Date manipulation
  "leaflet": "^1.9.4",              // Interactive maps
  "react": "^19.1.0",               // React library
  "react-dom": "^19.1.0",           // React DOM rendering
  "react-leaflet": "^5.0.0",        // React components for Leaflet
  "react-router-dom": "^7.4.1"      // Routing

devDependencies: 
  "@eslint/js": "^9.21.0",
  "@types/react": "^19.0.10",
  "@types/react-dom": "^19.0.4",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.21.0",
  "eslint-plugin-react-hooks": "^5.1.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "globals": "^15.15.0",
  "postcss": "^8.5.3",
  "tailwindcss": "^3.4.17",
  "vite": "^6.2.3"


## Project Structure

### Backend 
The backend is located in the `backend/` directory and serves as the core of the application. It provides the following features:
- **Safest Path Calculation**: Algorithms to determine the safest route based on real-time data and show reviews around the path.
- **Deepfake Detection**: Integration of a pre-trained machine learning model to detect deepfake media.
- **SOS Calling**: Backend support for triggering SOS alerts and notifying emergency contacts.
- **Emergency Contact Management**: APIs to manage and store emergency contact details.
- **Database Integration**: MongoDB is used to store user data, uploaded files, and other critical information.

### Frontend
The frontend is located in the `frontend/` directory and provides a user-friendly interface for the application. It includes:
- **Interactive Map**: Displays the safest path for users.
- **Deepfake Detection Interface**: Allows users to upload media for analysis.
- **SOS Button**: A quick-access button for sending emergency alerts.
- **Emergency Contact Management**: A simple UI to add, edit, or delete emergency contacts.
- **Responsive Design**: Built with Tailwind CSS to ensure compatibility across devices.

---

## Installation

### Backend
1. Navigate to the `backend/` directory:
   ```sh
   cd backend
   pip install -r requirements.txt
   npm install (use --force if all packages are not installed)

### Frontend
1. Navigate to frontend/directory
    ```sh
    cd frontend
    npm install (use --force if all packages are not installed)

---
## Launching

### Launching Frontend 
1. Navigate to frontend/directory
   ```sh
   cd frontend
   npm run dev

### Usage for Backend:
   ```sh
   node server.js 
   uvicorn  fileupload:app --reload --port 8080 (in new terminal)

---
## Team Details
Abhay Madan
Swastik Bist
Nikhil Agrawal
Manvi Sinha
