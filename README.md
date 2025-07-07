# 📚 Library Management API With Express JS, Typescript and MongoDB(Mongoose).

A robust and type-safe backend API for managing library operations such as book inventory, borrowing books — built with 
**Express.js**, 
**TypeScript**, 
**MongoDB** using **Mongoose**.

---

## 🎯 Objective

Develop a full-featured Library Management System API that supports book management, borrowing logic, and aggregation reporting book summery, business logic enforcement, and Mongoose middleware and Pre, Post hooks.

---

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Runtime**: Node.js

---

## 🗂️ Project Structure
src/
|--app
    ├── config/ # Environment and DB config
    ├── controllers/ # Request handlers
    ├── models/ # Mongoose models (Book, Borrow)
    ├── routes/ # API route definitions
├── app.ts # app setup
└── server.ts # Entry point

## 🔧 Core Features

- ✅ Schema validation for books and borrow records
- 🔁 Business logic for book availability on borrow
- 📊 Borrow summary via MongoDB aggregation
- 🧠 Use of Mongoose static/instance methods
- ⛓️ Mongoose middleware (`pre`, `post`)
- 🔍 Filtering, sorting & pagination on book queries
- 💡 Consistent error response format

## 🌐 API Endpoints

### 1. 📘 Create Book
      **POST** `/api/books`

    2. 📚 Get All Books
      **GET** `/api/books`

      Supports query:

      filter → by genre

      sortBy → field to sort (createdAt, copies, etc.)

      sort → asc or desc

      limit → number of results

    3. 📖 Get Book by ID
      **GET** /api/books/:bookId
    
    4. ✏️ Update Book
      **PUT** /api/books/:bookId

    5. ❌ Delete Book
      **DELETE** /api/books/:bookId

    6. 📥 Borrow a Book
      **POST** /api/borrow

    7. 📊 Borrowed Books Summary (Aggregation)
      **GET** /api/borrow

**Getting Started**
- git clone https://github.com/your-username/library-management-api.git 
- cd library-management-api**
- npm install**

**Run**
- npm run dev        # Development
- npm run build      # Build

**Live Link**
- https://library-management-server-omega-hazel.vercel.app/






