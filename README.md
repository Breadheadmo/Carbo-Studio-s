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

Getting Started
Follow these steps to set up and run the application on your local environment.

1. Clone the Repository
bash
Copy code
git clone [https://github.com/yourusername/CarboStudio.git](https://github.com/Breadheadmo/Carbo-Studio-s)
cd CarboStudio

Clone the Repository https://github.com/Stake99/Carbo_studios-api.git

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
