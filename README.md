# 🏥 Health & Wellness App - Backend

A comprehensive health and wellness platform backend built with the MERN stack, providing APIs for fitness tracking, nutrition planning, mental health support, and goal management.

## 🚀 Live Demo

- **Backend API**: [https://guvi-finalproject-backend.onrender.com](https://guvi-finalproject-backend.onrender.com)
- **Frontend App**: [https://jascarshealthandweathnessapp.netlify.app](https://jascarshealthandweathnessapp.netlify.app)
- **Frontend Source**: [https://github.com/beni2408/guvi-finalproject-frontend.git](https://github.com/beni2408/guvi-finalproject-frontend.git)

## 📋 Features

### 🏃 Fitness Tracking
- Log various exercises (running, cycling, strength training, etc.)
- Track duration, distance, and calories burned
- View fitness history and statistics
- Edit and delete fitness activities

### 🥗 Nutrition Planning
- Log daily food intake with detailed nutritional information
- Track calories, protein, carbs, and fat
- Categorize meals (breakfast, lunch, dinner, snack)
- View nutrition history and statistics
- Edit and delete food entries

### 🎯 Goal Setting & Tracking
- Set personal health and wellness goals
- Track progress with current vs target values
- Goal status management (active, completed, paused)
- Edit and delete goals
- Progress calculation and updates

### 🧠 Mental Health Support
- Log mood ratings (1-10 scale)
- Track stress levels and sleep hours
- Record mental health activities (meditation, journaling, etc.)
- View mental health statistics and trends
- Edit and delete mental health entries

### 👤 User Management
- Secure user registration and login
- JWT-based authentication
- Profile management with personal information
- Profile image upload and management
- Password hashing with bcrypt

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **Deployment**: Render

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register          - User registration
POST /api/auth/login             - User login
PUT /api/auth/update/:id         - Update user profile
POST /api/auth/upload-profile-image - Upload profile image
DELETE /api/auth/profile-image   - Delete profile image
```

### Fitness Tracking
```
POST /api/fitness/activity       - Log fitness activity
GET /api/fitness/history         - Get fitness history
GET /api/fitness/stats           - Get fitness statistics
PUT /api/fitness/activity/:id    - Update fitness activity
DELETE /api/fitness/activity/:id - Delete fitness activity
```

### Nutrition Planning
```
POST /api/nutrition/food         - Log food intake
GET /api/nutrition/history       - Get nutrition history
GET /api/nutrition/stats         - Get nutrition statistics
PUT /api/nutrition/food/:id      - Update food entry
DELETE /api/nutrition/food/:id   - Delete food entry
```

### Goal Management
```
POST /api/goals                  - Create goal
GET /api/goals                   - Get user goals
PUT /api/goals/progress/:id      - Update goal progress
PUT /api/goals/edit/:id          - Edit goal details
DELETE /api/goals/:id            - Delete goal
```

### Mental Health
```
POST /api/mental-health/log      - Log mental health entry
GET /api/mental-health/history   - Get mental health history
GET /api/mental-health/stats     - Get mental health statistics
PUT /api/mental-health/entry/:id - Update mental health entry
DELETE /api/mental-health/entry/:id - Delete mental health entry
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/beni2408/guvi-finalproject-backend.git
cd guvi-finalproject-backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
# Create .env file with the following variables:
PORT=1311
DB_URI=your_mongodb_connection_string
SALT_ROUNDS=10
JWT_AUTH_SECRET_KEY=your_jwt_secret_key
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_app_password
SENDGRID_API_KEY=your_sendgrid_api_key
```

4. Start the development server
```bash
npm run dev
```

5. Start the production server
```bash
npm start
```

## 📁 Project Structure

```
guvi-finalproject-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── userController.js     # User authentication & profile
│   │   ├── fitnessController.js  # Fitness tracking logic
│   │   ├── nutritionController.js # Nutrition planning logic
│   │   ├── goalController.js     # Goal management logic
│   │   └── mentalHealthController.js # Mental health logic
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── uploadMiddleware.js   # File upload handling
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── fitnessModel.js       # Fitness activity schema
│   │   ├── nutritionModel.js     # Nutrition entry schema
│   │   ├── goalModel.js          # Goal schema
│   │   └── mentalHealthModel.js  # Mental health schema
│   ├── routes/
│   │   ├── userRoutes.js         # Authentication routes
│   │   ├── fitnessRoutes.js      # Fitness tracking routes
│   │   ├── nutritionRoutes.js    # Nutrition planning routes
│   │   ├── goalRoutes.js         # Goal management routes
│   │   └── mentalHealthRoutes.js # Mental health routes
│   └── utils/
│       ├── generateToken.js      # JWT token generation
│       └── sendEmail.js          # Email utility
├── uploads/
│   └── profiles/                 # Profile image storage
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── index.js                      # Main server file
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- User data isolation (users can only access their own data)
- File upload validation and size limits
- Environment variable protection
- CORS configuration for cross-origin requests

## 🌐 Deployment

The backend is deployed on [Render](https://render.com) with the following configuration:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**: Configured in Render dashboard

## 🤝 Contributing

This is an open-source project. Feel free to fork, modify, and submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Built with ❤️ for promoting health and wellness through technology.

---

**Note**: This project is part of a full-stack MERN application. The frontend repository can be found [here](https://github.com/beni2408/guvi-finalproject-frontend.git).