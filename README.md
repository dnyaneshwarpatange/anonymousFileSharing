# Anonymous File Sharing Platform

# Author: [Dnyaneshwar Patange](https://github.com/dnyaneshwarpatange)

## Project Structure

The project is divided into two main directories:

- **client**: Frontend (React app)
- **server**: Backend (Node.js with Express, Firebase integration)

## Features

- **File Upload**: Allows users to upload files with automatic storage in Firebase Storage.
- **File Download**: Users can download their files through the platform.
- **Expiration-Based Cleanup**: Files have expiration dates. An automatic cleanup mechanism removes expired files both from Firebase Storage and Firestore.
- **Manual Cleanup**: Admins can trigger manual cleanup via an API route.
  
## Technologies Used

- **Frontend**: React,TailwindCSS
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Task Scheduling**: node-cron
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dnyaneshwarpatange/anonymousFileSharing.git
   ```
2. Navigate to the project directory:
   ```bash
   cd anonymousFileSharing
   ```
3. Install the dependencies:
   ```bash
   cd client && npm install
   cd server && npm install
   ```
4. Create a Firebase project and enable the Firebase Hosting and Firebase Functions services.
5. Copy the `.env.example` file to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```
6. Run the application:
   ```bash
   npm run dev
   node index.js for server
   ```
7. Open your browser and navigate to `http://localhost:3000`.   



### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/) (Comes with Node.js)
- [Firebase CLI](https://firebase.google.com/docs/cli) (For Firebase Hosting & Functions)
