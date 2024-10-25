# TwendeCars

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Express](https://img.shields.io/badge/Backend-Express-blue)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Server-Node.js-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen)

TwendeCars is a user-friendly car dealership web application built using the MERN stack (MongoDB, Express, React, Node.js). The platform enables clients to buy, lease, and sell vehicles, allowing seamless management of car listings with personalized user profiles. Users can sign up using Google OAUTH or with an email registration, upload car images, and provide detailed information about each vehicle. The platform offers multiple categories, including "Recent Offers," "Cars for Sale," and "Leasable Cars," making it easy for potential buyers and leasers to find the right vehicle.

### [Live Demo](https://twendecars.onrender.com/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Registration and Authentication**: Users can sign up using Google OAUTH or create an account with an email and password.
- **User Profile Management**: Users can update profile details, delete their account, and sign out.
- **Car Listings**: Users can create, view, and manage car listings with images, descriptions, and sale or lease status.
- **Categories and Filtering**: Cars are organized into categories such as "Recent Offers," "Cars for Sale," and "Leasable Cars." Users can filter listings by various criteria.
- **Search Functionality**: Search bar allows users to find cars quickly based on preferences.
- **Car Removal**: When a car is sold or leased, the owner can remove it from the listing, keeping available options up-to-date.

---

## Tech Stack

- **Front-end**: React
- **Back-end**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Google OAUTH and custom email authentication

---

## Installation

### Prerequisites
- Node.js and npm
- MongoDB server or MongoDB Atlas account for database

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/TwendeCars.git
   cd TwendeCars
2. **Back-end Setup**

Navigate to the backend directory.
Configure MongoDB connection and Google OAUTH keys in the .env file.
Install dependencies and start the Express server:
```bash
npm install
npm start
```
3. **Front-end Setup**

Navigate to the frontend directory.
Install dependencies and start the React development server:
```bash
npm install
npm start
```
4. **Access the Application**

Open a browser and go to http://localhost:3000.

**Usage**
*Registering and Logging In*
Users can register either through Google OAUTH or by providing a username, email, and password.

*Managing Profile*
- Click the profile icon to access account settings, where users can:
- Update profile details
- View and manage personal car listings
- Delete their account if desired

**Creating and Managing Car Listings**
1. Click Create Car List to add new cars for sale or lease.
2. Upload images, add descriptions, and specify whether the car is an offer.
3. Cars are displayed under relevant categories and available for potential buyers/leasers to view.
   
**Viewing Cars by Category**
- Recent Offers: Displays cars that are newly listed as offers.
- Cars for Sale: Contains all cars listed for sale.
- Leasable Cars: Lists all cars available for lease.

**Search and Filter**
Use the search bar and filter options to narrow down car listings based on preferences.

**Deleting Car Listings**
Once a car is sold or leased, owners can remove it from the listing, ensuring that only available vehicles are shown.

**Future Enhancements**
- Enhanced Notifications: Notify users when there is interest in their listings or when offers are accepted.
- Payment Integration: Allow in-app payments for leasing or buying cars.

**Contributing**
We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request for review.
For major changes, please open an issue to discuss your ideas first.

**License**
This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.


