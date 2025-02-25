# Google Photos Clone

A platform to create folders, upload, and view files, using Cloudinary for media storage, similar to Google Photos.

## Features

- Create and organize folders
- Upload and store files
- View and manage uploaded media
- Cloudinary integration for file storage
- PostgreSQL database hosted on Supabase

## Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **File Storage**: [Cloudinary](https://cloudinary.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on [Supabase](https://supabase.io/)


## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [Cloudinary Account](https://cloudinary.com/) for media storage
- [Supabase Account](https://supabase.io/) for hosting your PostgreSQL database

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install backend dependencies:  ```
  npm install ```
3. Set up your Cloudinary credentials in the .env file:
   ```
      CLOUDINARY_CLOUD_NAME=
      CLOUDINARY_API_KEY=
      CLOUDINARY_API_SECRET=
      DB_USER= 
      SUPABASE_PASSWORD=
      DB_NAME=
      DB_HOST=
      DB_PORT=
   ```
4. Start the backend server:
   ```
      npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
    cd frontend
   ```
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm run dev
   ```
 

