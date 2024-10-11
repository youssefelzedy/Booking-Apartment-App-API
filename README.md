# AirbnbClone - Apartment Booking API

This project is an API for a booking apartment web app using Node.js, Express, and MongoDB. The API allows users to search for available apartments, make bookings, and manage apartment listings. It supports user authentication and authorization using JWT tokens.

## Features

- User authentication (Sign-up, Login)
- JWT-based authorization
- CRUD operations for apartments
- Bookings management
- Apartment availability check
- Secure API routes with data validation

## Technologies Used

- **Node.js**: Backend server
- **Express.js**: Web framework
- **MongoDB**: NoSQL database for storing user and apartment data
- **Mongoose**: ODM for MongoDB
- **JWT (JSON Web Token)**: For secure authentication
- **Bcrypt.js**: Password hashing
- **Nodemailer**: Email sending service for user notifications
- **Validator**: For validating and sanitizing inputs

## Installation

1. Clone the repository:

```bash
git clone https://github.com/youssefelzedy90/AirbnbClone.git
cd AirbnbClone
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://youssefelzedy90:<PASSWORD>@cluster0-pwikv.mongodb.net/natours?retryWrites=true
DATABASE_LOCAL=mongodb://localhost:27017/Airbnb
DATABASE_PASSWORD=your_mongodb_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

4. Replace `<PASSWORD>` and other placeholders with actual values.

## Scripts

- **Start the server (development mode)**:

  ```bash
  npm start
  ```

- **Start the server (production mode)**:

  ```bash
  npm run start:prod
  ```

- **Debug mode**:

  ```bash
  npm run debug
  ```

## API Endpoints

### Authentication Routes

- **POST /api/v1/users/signup**  
  Create a new user account.

- **POST /api/v1/users/login**  
  Login and obtain a JWT token.

### Apartment Routes

- **GET /api/v1/apartments**  
  Get a list of all apartments.

- **GET /api/v1/apartments/:id**  
  Get details of a specific apartment by ID.

- **POST /api/v1/apartments**  
  Create a new apartment listing (admin only).

- **PATCH /api/v1/apartments/:id**  
  Update an apartment listing by ID (admin only).

- **DELETE /api/v1/apartments/:id**  
  Delete an apartment listing by ID (admin only).

### Booking Routes

- **POST /api/v1/review**  
  Create a booking for a specific apartment.

- **GET /api/v1/review/:id**  
  Get details of a specific booking.

- **PATCH /api/v1/review/:id**  
  PATCH details of a specific booking.

- **DELETE /api/v1/review/:id**  
  PATCH details of a specific booking.

## Project Structure

```
├── controllers/
│   ├── authController.js
│   ├── apartmentController.js
│   ├── reviewController.js
│   ├── userController.js
│   └── errorController.js
├── models/
│   ├── apartmentModel.js
│   ├── reviewModel.js
│   └── userModel.js
├── routes/
│   ├── apartmentRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── catchAsync.js
│   └── appError.js
├── app.js
├── server.js
└── .env
```

## Database

- **MongoDB Atlas** is used for the production database, and **MongoDB Local** is used for development.
- **Mongoose** is used to manage database connections and schema.

## Security

- **JWT** is used for user authentication. Each user must provide a valid token to access protected routes.
- Passwords are hashed using **bcrypt**.


## License

This project is licensed under the MIT License.

---

### Author

**Youssef Elzedy**
