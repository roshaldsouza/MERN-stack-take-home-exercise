# 🌐 MERN Stack Developer Intern Project

This project is built as part of the **MERN Stack Developer Intern** role.  
It demonstrates end-to-end development of a modern web application using **MongoDB, Express.js, React.js, and Node.js (MERN)** with focus on **clean code, responsiveness, authentication, and interactive features**.

---

## ✨ Features

### 🔐 Frontend
- Google OAuth authentication with secure session handling
- User profile creation and management
- Responsive design across all devices
- Interactive **data visualizations and charts** (using libraries like Chart.js or Recharts)
- API integration with **Axios / Fetch**

### ⚙️ Backend
1. **API Development**  
   - RESTful API endpoints for CRUD operations
   - Modular and scalable Express.js architecture

2. **Database Management**  
   - NoSQL: **MongoDB Atlas** (preferred)  
   - SQL: Optional PostgreSQL/MySQL if required  
   - Efficient schema design for scalability

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS / Bootstrap, Chart.js / Recharts, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (NoSQL) or PostgreSQL/MySQL (SQL)  
- **Authentication:** Google OAuth 2.0 (via Google Identity / Passport.js / Firebase Auth)  
- **Version Control:** Git + GitHub  

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/mern-intern-project.git
cd mern-intern-project
2. Install Dependencies
bash
Copy
Edit
# Install root dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
3. Environment Variables
Create a .env file in both client/ and server/ directories.

Example: server/.env

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
JWT_SECRET=your_jwt_secret
Example: client/.env

env
Copy
Edit
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
4. Run the Application
bash
Copy
Edit
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm run dev
📂 Project Structure
csharp
Copy
Edit
mern-intern-project/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page-level components
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Helper functions
│   └── public/
│
├── server/              # Express backend
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose models / DB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   └── tests/           # Backend tests
│
├── README.md
└── package.json
