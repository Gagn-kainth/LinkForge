URL Shortener
A URL shortener REST API using Node.js, Express, MongoDB, and nanoid for generating unique short codes.

Features

Generate short codes for long URLs
Redirect short URLs to original URLs
MongoDB for persistent storage
Unique short code generation with nanoid


Tech Stack

Node.js — runtime
Express — web framework
MongoDB + Mongoose — database
nanoid — short code generation
nodemon — auto-restart in development


Project Structure
url-shortener/
├── routes/
│   └── url.js        # URL routes (create, redirect)
├── models/
│   └── url.js        # Mongoose schema
├── connect.js        # MongoDB connection
├── index.js          # Entry point
└── package.json

Getting Started
1. Clone the repo
   git clone https://github.com/YOUR_USERNAME/url-shortener.git
  cd url-shortener
3. Install dependencies
   npm install
4. Make sure MongoDB is running locally
   mongod
5. Start the server
   npm start
   Server runs on http://localhost:8001

API Endpoints
Method      Endpoint      Description
POST        /url          Create a short URL
GET         /:shortId     Redirect to original URL


Example Request
httpPOST /url
Content-Type: application/json

{
  "url": "https://www.example.com/some/very/long/url"
}

Example Response
json{
  "shortId": "x9kP2m",
  "shortURL": "http://localhost:8001/x9kP2m"
}
