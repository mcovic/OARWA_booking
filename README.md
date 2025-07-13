# OARWA - Hair Salon Booking System

## Description
"Hair Salon Booking System" is a web application that allows customers to book appointments at a hair salon. Customers can view available appointments, book a slot, and manage their bookings. Salon owners can manage appointments and delete bookings.

## Installation

### Prerequisites
- Node.js
- MongoDB Compass

### Steps to Set Up the Project
1. **Environment Configuration:**
   - Locate the `.env.example` file in the root directory and `.env.local.example` in the `frontend` directory.
   - Create a new `.env` file by copying the contents of the `.env.example` file, and a new `.env.local` file by copying the contents of the `.env.local.example` file.
   - Follow the instructions inside example files to fill the fields


2. **Database Setup:**
   - Open MongoDB Compass and create a new connection following the `.env` configuration.


3. **Install Dependencies:**
   - Navigate to the root directory and install starting root dependencies:
     ```bash
     npm install
     ```
   - Stay in the root directory and install all of the rest (frontend and backend) dependencies:
     ```bash
        npm run install-all
     ```


4. **Run the Application:**
    - Start the development server:
      ```bash
      npm run start
      ```
    - The application will now be running locally. Check your terminal or console for the URL to access it in your browser.


## Admin Credentials
- **Username:** `admin`
- **Password:** `admin1234`

## User Credentials
- **Username:** `user`
- **Password:** `user1234`

## Technologies Used
- **Frontend:** React with TypeScript
- **Backend:** Node.js/Express with TypeScript
- **Database:** MongoDB and Mongoose