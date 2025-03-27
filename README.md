# Node.js Auth Service

A simple Node.js service with Basic Auth protection.

## Features

- Public route (`/`) that returns "Hello, world!"
- Protected route (`/secret`) that requires Basic Auth
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   SECRET_MESSAGE=Your secret message here
   USERNAME=your_username
   PASSWORD=your_password
   ```

## Running the Service

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Testing the Routes

1. Public Route:
   - Visit `http://localhost:3000/`
   - Should display "Hello, world!"

2. Protected Route:
   - Visit `http://localhost:3000/secret`
   - Enter the username and password when prompted
   - If credentials are correct, you'll see the secret message
   - If credentials are incorrect, you'll see an error message

## Security Note

Make sure to change the default credentials in the `.env` file before deploying to production. 