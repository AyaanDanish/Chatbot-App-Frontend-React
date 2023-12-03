# Azure Chatbot Project Wiki

Welcome to the Azure Chatbot project! This custom-made chatbot application is designed to resemble ChatGPT, featuring a React frontend and a Flask backend.

## Project Overview

### Components

1. **Frontend (React)**

   - The user interface for the chatbot is built using React.
   - Interactive and user-friendly design to enhance the user experience.

2. **Backend (Flask)**
   - The backend is powered by Flask, a lightweight and flexible Python web framework.
   - Handles user requests, processes natural language, and communicates with external services.

### Features

- **Natural Language Processing (NLP):**

  - Utilizes advanced NLP techniques to understand and respond to user inputs effectively.

- **Scalability:**

  - Designed to scale efficiently, accommodating a growing user base and increased workload.

- **Customization:**
  - Easily customizable to add new features or integrate with external services.

## Getting Started

### Prerequisites

- Node.js and npm for the React frontend.
- Python and pip for the Flask backend.
- Azure DevOps account with appropriate permissions.

### Installation

1. **Frontend (React):**

   ```bash
   cd "React Frontend"
   npm install
   npm run dev
   ```

1. **Backend (Flask):**
   ```bash
   cd "Flask Backend"
   pip install -r requirements.txt
   python app.py
   ```

## Deployment

### Frontend Deployment

- The frontend deployment is Dockerized
- Deployed on Azure Web App for Containers
- Can be accessed at https://chatbot-devops.azurewebsites.net/

### Backend Deployment

- The backend is deployed directly
- Deployed on Azure Web Apps
- Can be accessed at https://chatbot-backend-devops.azurewebsites.net/
