## SecurePathway

## Overview
SecurePathway is a full-stack application designed to enhance **women's safety** by providing features such as identifying the safest path, detecting deepfake media, SOS calling, and managing emergency contacts. The project integrates machine learning, real-time data processing, and a user-friendly interface to ensure a comprehensive safety solution.

---
Features
Safest Path: Provides users with the safest route based on real-time data.
Deepfake Detection: Upload media to detect potential deepfake content using a pre-trained SqueezeNet model.
SOS Calling: Instantly send alerts to emergency contacts with location details.
Emergency Contacts: Manage emergency contacts for quick access during critical situations.
User-Friendly Interface: A responsive and intuitive frontend for seamless interaction.


## Project Structure

### Backend
The backend is located in the `backend/` directory and serves as the core of the application. It provides the following features:
- **Safest Path Calculation**: Algorithms to determine the safest route based on real-time data.
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
   npm install

## Frontend
1. Navigate to frontend/directory
    ```sh
    cd frontend
    npm install

## Usage for Backend:
```sh
node server.js 
uvicorn  fileupload:app --reload --port 8080 (in new terminal)
