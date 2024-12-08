
# Real Estate Application

## Overview

This Real Estate Application allows users to browse, search, and filter properties available for sale or rent. It is built with **React** for the frontend and **Node.js** for the backend, utilizing **MongoDB** for data storage.

## Features

- **User Authentication**: Sign up, log in, and manage user profiles.
- **Property Listings**: Browse properties available for sale or rent.
- **Search and Filter**: Search for properties based on location, price, and property type.
- **Admin Dashboard**: Admins can add, update, or delete property listings.
- **Real-Time Updates**: Notifications and updates on newly added properties.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- MongoDB (or MongoDB Atlas)
- Git
- A Vercel/Heroku account for deployment (optional)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/devshakilh/real-estate-app.git
cd real-estate-app
```

#### 2. Backend Setup

- Navigate to the `server` directory.
- Install dependencies.

```bash
cd server
npm install
```

- Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### 3. Frontend Setup

- Navigate to the `client` directory.
- Install dependencies.

```bash
cd client
npm install
```

#### 4. Running the Application

To start the application locally, first run the backend and then the frontend.

- **Start the Backend**:

```bash
cd server
npm run dev
```

- **Start the Frontend**:

```bash
cd client
npm start
```

Now, you can open your browser and navigate to `http://localhost:3000` to see the application in action.

## Deployment

### 1. Backend Deployment (Node.js/Express)

For deploying the backend, we recommend using **Heroku**, **Vercel**, or **DigitalOcean**. 

To deploy with **Heroku**:

- Create a Heroku app: `heroku create your-app-name`
- Push the backend code to Heroku: `git push heroku master`

### 2. Frontend Deployment (React)

For deploying the frontend, **Vercel** or **Netlify** are great choices.

To deploy with **Vercel**:

- Install Vercel CLI: `npm install -g vercel`
- Deploy: `vercel`

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in and get a JWT.

### Properties

- **GET** `/api/properties`: Get all properties.
- **POST** `/api/properties`: Add a new property (admin only).
- **PUT** `/api/properties/:id`: Update an existing property (admin only).
- **DELETE** `/api/properties/:id`: Delete a property (admin only).

### Notifications

- **GET** `/api/notifications`: Get all notifications for the logged-in user.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

MIT License
