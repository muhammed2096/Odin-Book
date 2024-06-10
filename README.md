Odin Book Backend
Odin Book is a social media platform inspired by the curriculum of the Odin Project. This repository contains the backend API for the Odin Book application, providing the necessary endpoints and functionalities to support user authentication, post creation, friendship management, and more.

Table of Contents
Features
Installation
Usage
API Endpoints
Technologies Used
Contributing
License
Acknowledgements
Features
User authentication and authorization
User profiles with bio and profile picture
Friend requests and friendship management
CRUD operations for posts and comments
Like functionality for posts and comments
Real-time notifications via WebSockets
Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/yourusername/odin-book-backend.git
cd odin-book-backend
Install dependencies:

Make sure you have Node.js installed. Then run:

npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
Run database migrations:

npx sequelize-cli db:migrate
Start the development server:

npm start
The API will be available at http://localhost:3000.

Usage
Running the Server
To start the server in development mode, use:

npm run dev
Testing
To run tests, use:

npm test
API Endpoints
Here are some of the main API endpoints provided by the Odin Book backend:

Auth
POST /api/auth/register - Register a new user
POST /api/auth/login - Log in a user and return a JWT
Users
GET /api/users - Get a list of users
GET /api/users/:id - Get a specific user by ID
PUT /api/users/:id - Update a user's profile
DELETE /api/users/:id - Delete a user
Posts
GET /api/posts - Get a list of posts
POST /api/posts - Create a new post
GET /api/posts/:id - Get a specific post by ID
PUT /api/posts/:id - Update a post
DELETE /api/posts/:id - Delete a post
Comments
POST /api/posts/:postId/comments - Add a comment to a post
PUT /api/comments/:id - Update a comment
DELETE /api/comments/:id - Delete a comment
Friends
POST /api/friends/request - Send a friend request
POST /api/friends/accept - Accept a friend request
POST /api/friends/reject - Reject a friend request
DELETE /api/friends/:id - Remove a friend
Technologies Used
Node.js
Express
Sequelize (PostgreSQL)
JWT (JSON Web Tokens) for authentication
Cloudinary for image storage
Socket.io for real-time notifications
Contributing
Contributions are welcome! To contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
The Odin Project for their comprehensive curriculum.
All contributors and open-source libraries used in this project.
