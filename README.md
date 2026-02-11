Secure Medical Image Sharing – Frontend

A secure web application frontend built using React + Vite for uploading, viewing, and securely sharing medical images between healthcare providers and patients.

🚀 Features

🔐 User Authentication (Login / Register)

📤 Secure Medical Image Upload

🖼️ View & Manage Uploaded Images

👥 Role-based access (Doctor / Patient)

🔒 Secure API communication

⚡ Fast development with Vite + HMR

🧹 ESLint configured

🛠️ Tech Stack

React

Vite

JavaScript

Axios (if used)

React Router (if used)

📁 Project Structure
Secure-Medical-Image-sharing-frontend/
│
├── public/               # Static files
├── src/                  # Main source code
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── services/         # API calls
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

⚙️ Prerequisites

Make sure you have installed:

Node.js (v16 or higher recommended)

npm (comes with Node)

Check versions:

node -v
npm -v

▶️ How to Run the Project in VS Code
Step 1: Clone the Repository
git clone https://github.com/lakshmi-prasanna-hub/Secure-Medical-Image-sharing-frontend.git

Step 2: Open in VS Code
cd Secure-Medical-Image-sharing-frontend
code .


OR
Right click folder → Open with Code

Step 3: Install Dependencies

Open terminal in VS Code:

npm install


This installs all required packages.

Step 4: Start Development Server
npm run dev


You will see output like:

VITE vX.X.X ready in XXX ms
Local: http://localhost:5173/


👉 Open the browser and go to:

http://localhost:5173/

🏗️ Build for Production
npm run build


To preview production build:

npm run preview

🔐 Environment Variables

If using API backend, create a .env file:

VITE_API_URL=http://localhost:5000/api


Restart server after adding .env.
