# JWT Authentication Implementation

A mini-project full-stack web application demonstrating secure authentication using JSON Web Tokens (JWT) with React and Express.js. The project includes both access and refresh token implementation, protected routes, and a blog feature to demonstrate authenticated API access.

## Features

### Authentication

-   User registration (signup) with password hashing
-   User login with JWT (Access + Refresh token) implementation
-   Automatic token refresh mechanism
-   Secure logout with token invalidation
-   Protected routes on both frontend and backend

### Blog System

-   Protected blog posting system
-   Authenticated API endpoints
-   Demonstration of token usage in API requests

### Security Features

-   HTTP-only cookies for token storage
-   Password hashing using bcrypt
-   CORS configuration for security
-   Token verification middleware
-   Automatic cleanup of expired refresh tokens

## Technical Stack

### Frontend (jwt-frontend)

-   React 19 with TypeScript
-   Vite for build tooling
-   React Router DOM for routing
-   Zustand for state management
-   Tailwind CSS for styling
-   Axios for API requests

### Backend (jwt-backend)

-   Express.js
-   PostgreSQL database
-   JSON Web Tokens (jsonwebtoken)
-   bcrypt for password hashing
-   node-cron for scheduled tasks
-   CORS for secure cross-origin requests

## Project Structure

### Frontend Structure

```
jwt-frontend/
├── src/
│   ├── components/
│   │   ├── routes/       # Route configurations
│   │   └── wrappers/     # Route protection components
│   ├── pages/
│   │   ├── protected/    # Authenticated user pages
│   │   └── public/       # Public pages
│   ├── stores/          # Zustand state management
│   ├── contexts/        # React contexts
│   ├── utils/           # Utility functions
│   └── styles/          # CSS styles
```

### Backend Structure

```
jwt-backend/
├── controllers/        # Route controllers
│   ├── private/       # Protected route controllers
│   ├── public/        # Public route controllers
│   └── token/         # Token management controllers
├── routes/            # Express routes
├── middlewares/       # Custom middlewares
├── db/               # Database configuration
├── jobs/             # Scheduled tasks
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   PostgreSQL database
-   npm or yarn package manager

### Setting Up the Backend

1.  Navigate to the backend directory:

    ```bash
    cd jwt-backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a .env file in the jwt-backend directory with the following variables:

        ```env
        PORT=YOUR_PORT
        ACCESS_SECRET=YOUR_ACCESS_SECRET
        REFRESH_SECRET=YOUR_REFRESH_SECRET
        DATABASE_URL=YOUR_DATABASE_URL
        ```

4.  Initialize the PostgreSQL database:

    -   Create a new database
    -   The tables will be automatically created when you first run the application

    Note: This project focuses on demonstrating JWT handling only — the example backend does not perform comprehensive signup validation (e.g., input validation, email verification). Do not use this signup flow in production without adding proper server-side validation and verification.

5.  Start the backend server:
    ```bash
    npm run dev
    ```

### Setting Up the Frontend

1. Navigate to the frontend directory:

    ```bash
    cd jwt-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Update the `url.ts` file in the frontend to match your backend URL:

    ```typescript
    // src/utils/url.ts
    export const url = 'http://localhost:YOUR_BACKEND_PORT';
    ```

    Replace `YOUR_BACKEND_PORT` with the port number where your backend is running.

4. Start the development server:
    ```bash
    npm run dev
    ```

The frontend will be available at the port your server runs

## API Endpoints

### Public Routes

-   `POST /api/signup` - Register a new user
-   `POST /api/login` - Authenticate user and receive tokens
-   `POST /api/token/refresh` - Refresh access token

### Protected Routes

-   `POST /api/logout` - Logout user and invalidate tokens
-   `GET /api/blog` - Get blog posts
-   `POST /api/blog` - Create a new blog post

## Security Considerations

-   Access tokens are short-lived (15 minutes)
-   Refresh tokens are long-lived (7 days) and stored in HTTP-only cookies
-   Passwords are hashed using bcrypt before storage
-   All sensitive operations require valid tokens
-   Regular cleanup of expired refresh tokens
-   CORS is configured to only allow requests from the frontend domain

## Token Storage & Security

-   Refresh tokens are stored in the database for revocation control
-   Database storage enables forced logouts and token invalidation
-   Refresh tokens are hashed before storage for additional security
-   Token validation checks both expiry and database status
-   Automatic cleanup of expired tokens from the database

## Development

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

-   Thanks to all the open-source libraries used in this project
-   Special thanks to the JWT, Express, and React communities
