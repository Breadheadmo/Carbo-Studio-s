Carbo Studio's is an exclusive online platform specializing in the distribution of high-value pre-owned designer clothing. This repository includes the frontend built with HTML, CSS, and JavaScript, and the backend API, developed using Node.js, AdonisJS, and TypeScript, which handles user authentication and CRUD operations.

Tech Stack
Frontend: HTML, CSS, JavaScript
Backend API: Node.js, AdonisJS, TypeScript, JavaScript
Database: MySQL
Caching: Redis (if applicable)
Prerequisites
Before setting up the application, ensure you have the following installed:

Node.js (version 14 or higher)
NPM (Node Package Manager, comes with Node.js)
MySQL (for database setup)
Redis (optional, if caching is used)
Getting Started
Follow these steps to set up and run the application on your local environment.

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/CarboStudio.git
cd CarboStudio
2. Install Dependencies
Install the necessary Node packages:

bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the root directory of the project and configure it with the following variables:

env
Copy code
# Server Configurations
HOST=127.0.0.1
PORT=3333

# Database Configurations
DB_CONNECTION=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DB_NAME=your_db_name

# Redis (if applicable)
REDIS_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
Replace the placeholders with your actual MySQL database details. Adjust the Redis configuration if caching is used.

4. Run Database Migrations
Set up the database structure by running migrations:

bash
Copy code
node ace migration:run
5. Start the API Server
To run the API in development mode with auto-reloading, use:

bash
Copy code
node ace serve --watch
This will start the server on http://127.0.0.1:3333 by default.

6. Access the Frontend
Open index.html in your browser to access the frontend. Ensure the API server is running for full functionality.

Usage
The backend API provides endpoints for user authentication and allows CRUD operations for managing products and user data. Here’s a quick overview of the core features:

User Authentication: Register, login, and manage user sessions.
Product Management: Create, read, update, and delete product listings.
User Management: Update and view user profiles.
Refer to the routes.ts file for all available API routes and their expected inputs.

Dependencies
Below is a list of dependencies required for the application:

@adonisjs/core: Core AdonisJS framework.
@adonisjs/auth: Authentication management.
@adonisjs/lucid: ORM for database management.
@adonisjs/validator: Request data validation.
mysql: MySQL driver for Node.js.
redis: Redis driver (if caching is used).
typescript: TypeScript support for static typing.
To install any missing dependency, you can use:

bash
Copy code
npm install <dependency-name>
