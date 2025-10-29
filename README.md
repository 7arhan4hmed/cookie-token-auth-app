cookie-token-auth-app

A Node.js authentication system using JWT tokens and cookies for secure login, signup, and protected routes. Built with Express, MongoDB, and EJS templates.

Features

User signup with hashed passwords

User login with JWT authentication

Protected profile page accessible only to authenticated users

Logout functionality that clears authentication cookies

Simple, responsive frontend using EJS

Technology Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt, cookies

Frontend: EJS templates
Installation

Clone the repository:

git clone https://github.com/yourusername/cookie-token-auth-app.git
cd cookie-token-auth-app


Install dependencies:

npm install


Start MongoDB (ensure MongoDB is running locally):

mongod


Run the server:

node app.js
# or using nodemon
nodemon app.js


Access the app:

http://localhost:3000
Usage
Signup

Navigate to /

Fill in username, email, password, age

Submit → automatically redirected to /profile

Login

Navigate to /login

Enter email and password

Submit → redirected to /profile if credentials are valid

Profile (Protected)

Accessible only with a valid JWT cookie

Displays username, email, and age

Logout

Navigates to /logout → clears the cookie and redirects to home

Security

Passwords are hashed using bcrypt before storage

JWT stored in httpOnly cookies to prevent client-side tampering

isLoggedIn middleware ensures only authenticated users can access protected routes

cookie-token-auth-app/
│
├── app.js               # Main Express server
├── models/
│   └── user.js          # Mongoose User schema
├── views/
│   ├── index.ejs        # Signup page
│   ├── login.ejs        # Login page
│   └── profile.ejs      # Protected profile page
└── public/              # Optional static files (CSS, JS)

Future Improvements

Password reset functionality

Email verification

Refresh token implementation for long-lived sessions

Role-based access control (admin/user)
