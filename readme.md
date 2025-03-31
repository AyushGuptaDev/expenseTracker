# Expense Tracker Backend

## 🚀 Overview
This is a **backend project** for an Expense Tracker application, built using **Node.js** and **MongoDB**. It provides APIs to manage user authentication and expense tracking functionalities such as adding, deleting, filtering, and calculating total expenses within a date range.

## ✨ Features
- 🔐 **User Authentication** (Signup & Login using JWT)
- 🔑 **Secure Password Hashing** with bcrypt
- 📌 **Add, Delete & View Expenses**
- 📅 **Filter Expenses by Date**
- 💰 **Calculate Total Expenses within a Date Range**

## 🛠️ Tech Stack
- **Node.js & Express.js** – Backend framework for API development
- **MongoDB & Mongoose** – Database for storing user and expense data
- **JWT (jsonwebtoken)** – Authentication for secure user sessions
- **bcrypt** – Password hashing for enhanced security
- **Postman** – API testing

## 📂 Project Structure
```
expense-tracker/
├── src/
│   ├── controller/
│   │   ├── expense.controller.js
│   │   ├── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   ├── model/
│   │   ├── expense.model.js
│   │   ├── user.model.js
│   ├── routes/
│   │   ├── expense.router.js
│   │   ├── user.router.js
│   ├── utils/
│   ├── app.js
│   ├── index.js
├── .env (excluded using .gitignore)
├── package.json
├── README.md
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AyushGuptaDev/expenseTracker.git
cd expenseTracker
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
```

### 4️⃣ Run the Server
```sh
npm run dev
```

## 📬 API Endpoints
### 🔹 Authentication
- **POST** `/api/auth/signup` – Register a new user
- **POST** `/api/auth/login` – Authenticate user and get JWT token

### 🔹 Expense Management
- **POST** `/api/expenses` – Add an expense
- **GET** `/api/expenses` – View all expenses
- **DELETE** `/api/expenses/:id` – Delete an expense
- **GET** `/api/expenses/filter?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` – Filter expenses within a date range
- **GET** `/api/expenses/total?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` – Get total expenses within a date range

## 📌 Testing with Postman
You can import the **Postman collection** to test the APIs. [Postman Collection Link](#) (Add the actual link)

## 🎯 Future Enhancements
- 📊 Analytics & Reporting Dashboard
- 📅 Recurring Expenses
- 📩 Email Notifications
- 💳 Payment Integration

## 📌 Contributing
Feel free to raise issues or submit pull requests to improve this project!

---

🔗 **GitHub Repository**: [Expense Tracker](https://github.com/AyushGuptaDev/expenseTracker)

