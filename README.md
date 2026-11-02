# Backend Development Assignment — REST API with Node.js, Express & MongoDB

A backend RESTful API built with Node.js, Express.js, and MongoDB Atlas using Mongoose. This project implements full CRUD (Create, Read, Update, Delete) operations following the Model-Route-Controller (MRC) architectural pattern.

---

## Technologies Used

* **Runtime:** Node.js
* **Framework:** Express.js (v5)
* **Database:** MongoDB Atlas (Cloud NoSQL Database)
* **ODM:** Mongoose
* **Environment Configuration:** dotenv
* **Development Tool:** Nodemon
* **API Testing:** Postman Desktop
* **Version Control:** Git & GitHub

---

## Project Architecture & Folder Structure

The project separates concerns into dedicated folders:

```
Backend Assignment/
├── config/
│   └── db.js                 # MongoDB Atlas Mongoose connection logic
├── controllers/
│   └── userController.js     # Business logic & error handling for CRUD
├── models/
│   └── userModel.js          # Mongoose schema and model definition
├── routes/
│   └── userRoutes.js         # API route endpoints mapped to controllers
├── .env.example              # Template for required environment variables
├── .gitignore                # Prevents node_modules and .env from being tracked
├── index.js                  # Application entry point and server startup
├── package.json              # Project metadata, scripts, and dependencies
├── package-lock.json         # Locked dependency versions
└── README.md                 # Project documentation
```

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/priyanshirai25cse/web_backend_assignment.git
cd web_backend_assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Configure your `.env` file with your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/<dbname>?retryWrites=true&w=majority
```

> **Note:** Never commit the `.env` file to version control. It is ignored by `.gitignore`.

### 4. MongoDB Atlas Configuration
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Security > Database Access**, create a database user with read/write permissions.
3. Under **Security > Network Access**, whitelist your IP address (or `0.0.0.0/0` for development).
4. Under **Database > Connect > Drivers**, copy the connection string and paste it into `MONGO_URI` in `.env`.

---

## Running the Application

### Development Mode (with hot-reload via Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

When connected successfully, the terminal displays:
```text
MongoDB Connected: <cluster-host>
Server is running on http://localhost:5000
```

---

## API Endpoints & CRUD Operations

**Base URL:** `http://localhost:5000/api/users`

| HTTP Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users` | Create a new user | `201 Created` |
| `GET` | `/api/users` | Get all users | `200 OK` |
| `GET` | `/api/users/:id` | Get a single user by ID | `200 OK` |
| `PUT` | `/api/users/:id` | Update a user by ID | `200 OK` |
| `DELETE` | `/api/users/:id` | Delete a user by ID | `200 OK` |

---

## Example Request & Response Payloads

### 1. Create User
* **Method:** `POST`
* **URL:** `http://localhost:5000/api/users`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "Aarav",
    "email": "aarav@example.com",
    "age": 20
  }
  ```
* **Success Response (`201 Created`):**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "_id": "6724xxxxxxxxxxxxxxxx",
      "name": "Aarav",
      "email": "aarav@example.com",
      "age": 20,
      "createdAt": "2026-11-01T12:00:00.000Z",
      "updatedAt": "2026-11-01T12:00:00.000Z",
      "__v": 0
    }
  }
  ```

### 2. Get All Users
* **Method:** `GET`
* **URL:** `http://localhost:5000/api/users`
* **Success Response (`200 OK`):**
  ```json
  {
    "count": 1,
    "users": [
      {
        "_id": "6724xxxxxxxxxxxxxxxx",
        "name": "Aarav",
        "email": "aarav@example.com",
        "age": 20,
        "createdAt": "2026-11-01T12:00:00.000Z",
        "updatedAt": "2026-11-01T12:00:00.000Z"
      }
    ]
  }
  ```

### 3. Get Single User
* **Method:** `GET`
* **URL:** `http://localhost:5000/api/users/:id`
* **Success Response (`200 OK`):**
  ```json
  {
    "_id": "6724xxxxxxxxxxxxxxxx",
    "name": "Aarav",
    "email": "aarav@example.com",
    "age": 20,
    "createdAt": "2026-11-01T12:00:00.000Z",
    "updatedAt": "2026-11-01T12:00:00.000Z"
  }
  ```

### 4. Update User
* **Method:** `PUT`
* **URL:** `http://localhost:5000/api/users/:id`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "Aarav Updated",
    "email": "aarav@example.com",
    "age": 21
  }
  ```
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "_id": "6724xxxxxxxxxxxxxxxx",
      "name": "Aarav Updated",
      "email": "aarav@example.com",
      "age": 21,
      "updatedAt": "2026-11-01T12:05:00.000Z"
    }
  }
  ```

### 5. Delete User
* **Method:** `DELETE`
* **URL:** `http://localhost:5000/api/users/:id`
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "User deleted successfully",
    "deletedUserId": "6724xxxxxxxxxxxxxxxx"
  }
  ```

---

## Error Handling

* **`400 Bad Request`**: Returned when missing mandatory fields, submitting invalid data types, supplying a malformed MongoDB ObjectId, or attempting to register a duplicate email.
* **`404 Not Found`**: Returned when an ID does not correspond to any document in the database.
* **`500 Internal Server Error`**: Returned for unexpected server issues without exposing sensitive database or environment internals.
