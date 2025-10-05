# 🧠 Quiz Management System (Backend)

A robust Node.js backend application for managing quizzes with authentication, automatic evaluation, and result tracking.

## 🚀 Features

- 👤 **User Authentication (JWT-based)**
- 🧾 **Quiz Creation & Question Management**
- 🧩 **Quiz Submission & Auto Evaluation**
- 📊 **User Result Tracking**
- 🧱 **Modular MVC Architecture**
- ⚡ **Built with Express.js, Mongoose, and Node.js**

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Error Handling:** Custom ApiError and ApiResponse utilities
- **Async Handling:** asyncHandler middleware

## 🧩 Project Structure

project-root/
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── question.controller.js
│   │   ├── quiz.controller.js
│   │   └── result.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── quiz.model.js
│   │   └── result.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── quiz.route.js
│   │   └── result.route.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── db/
│   │    └── index.js
│   ├── app.js
│   ├── index.js
│   ├── constants.js
├── .env
├── .gitignore
├── package.json
```

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment
Create a `.env` file in the project root:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<your-cluster-url>
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=your_jwt_expiry
```

### 4️⃣ Launch Server
```bash
npm run dev
```

Server will start at `http://localhost:3000`

## 🧪 Testing Instructions

### Manual API Testing
Can test manually using Postman or Thunder Client:

**Base Url: http://localhost:3000**

1. **Authentication Flow**
    - Register: POST /api/user/register
    - Login: POST /api/user/login
    - Logout: POST /api/user/logout

2. **Quiz Management**
    - Create Quiz → POST /api/quiz/create
    - Get all Quizzes -> GET /api/quiz/
    - Get specifiz Quiz -> GET /api/quiz/:quizId
    - Add Questions → POST /api/quiz/:quizId/questions
    - Get All Quizzes → GET /api/quiz/:quizId/questions

3. **Results Management** 
    - Submit Quiz → POST /api/quiz/:quizId/submit
    - View My Results → GET /api/result/my-results

## 🧩 Assumptions & Design Choices

### 🔒 Authentication via JWT
Each user must log in to perform protected actions like creating a quiz, adding questions, or submitting answers.

### 👤 Role of Logged-in User
Only authenticated users can create quizzes. The createdBy field is automatically set using the logged-in user's ID (req.user._id).

### 📝 Scoring System
Each question can have variable points (default is 1). The total score is calculated dynamically based on correct answers.

### 🔄 Data Relationships
- Quiz model contains all its questions
- Result model references both User and Quiz for efficient querying of user history
- Used populate() to fetch related quiz titles when displaying results

### ⚠️ Error Handling
Centralized using a custom ApiError, ApiResponse and asyncHandler utility to ensure clean and consistent responses/errors.

### 🔐 Security Choices
- Passwords are hashed using bcrypt
- JWT stored in httpOnly cookies to protect against XSS attacks
- verifyJWT middleware ensures token validation for all secure routes

### 🧪 Assumption about Testing
Test cases assume that at least one user and one quiz exist in the database before testing routes like "submit quiz" or "get results."