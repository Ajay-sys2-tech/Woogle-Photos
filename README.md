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
2. Install backend dependencies:
   ```
     npm install
   ```
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

 ### Screenshots of the live app
 ![image](https://github.com/user-attachments/assets/02b2d315-f3ca-47e0-9c2f-5c32e9419ef3)
 ![image](https://github.com/user-attachments/assets/a124cc90-d9bc-45d5-b2a5-4915af7aa42f)
 ![image](https://github.com/user-attachments/assets/7a572009-c184-4711-ae52-9e3c336bcf31)
 ![image](https://github.com/user-attachments/assets/31315414-2fe9-471b-968f-adc42a8ed008)
 ![image](https://github.com/user-attachments/assets/baad8c20-5410-44ed-a495-dbb4d1a0d465)






