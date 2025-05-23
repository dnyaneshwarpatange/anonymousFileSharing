# SecureShare - Anonymous File Sharing Platform

A modern, secure, and user-friendly file sharing platform that allows users to share files anonymously with automatic expiration.

![SecureShare](https://img.shields.io/badge/SecureShare-Anonymous%20File%20Sharing-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC)
![Firebase](https://img.shields.io/badge/Firebase-10.0.0-orange)

## 🌟 Features

- **Secure File Upload**: Upload files with automatic storage in Firebase Storage
- **Anonymous Sharing**: Share files without revealing your identity
- **Automatic Expiration**: Files automatically expire after a set time
- **Drag & Drop**: Modern drag and drop interface for easy file uploads
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode**: Built-in dark mode support
- **Real-time Progress**: Upload progress indication
- **Copy to Clipboard**: One-click copy of file sharing links
- **Automatic Cleanup**: Expired files are automatically removed
- **Manual Cleanup**: Admin API endpoint for manual cleanup

## 🛠️ Technologies Used

- **Frontend**:
  - React 18
  - TailwindCSS
  - Framer Motion (Animations)
  - Firebase SDK
  - Vite (Build Tool)

- **Backend**:
  - Node.js
  - Express.js
  - Firebase Admin SDK
  - node-cron (Task Scheduling)

- **Storage & Database**:
  - Firebase Storage
  - Firebase Firestore

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/secure-share.git
   cd secure-share
   ```

2. **Set up Firebase**
   - Create a new Firebase project
   - Enable Firebase Storage and Firestore
   - Download your Firebase service account key
   - Create a `.env` file in the server directory with your Firebase config

3. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

4. **Configure environment variables**

   Create `.env` file in the client directory:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   Create `.env` file in the server directory:
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY_PATH=path_to_your_service_account_key.json
   FIREBASE_BUCKET_NAME=your_bucket_name
   PORT=5000
   ```

5. **Run the application**
   ```bash
   # Start the client (in the client directory)
   npm run dev

   # Start the server (in the server directory)
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📱 Features in Detail

### File Upload
- Drag and drop interface
- File size limit: 10MB
- Progress indication
- Automatic file type detection

### File Management
- Custom expiration time (minutes/hours)
- Maximum expiration: 24 hours
- Automatic cleanup of expired files
- Secure file storage

### User Interface
- Responsive design
- Dark/Light mode
- Modern animations
- Mobile-friendly layout

## 🔒 Security Features

- Anonymous file sharing
- Automatic file expiration
- Secure Firebase storage
- No user data collection
- Automatic cleanup of expired files

## 🧪 API Endpoints

### Server Endpoints

- `GET /files/:id` - Get file information
- `POST /cleanup` - Trigger manual cleanup (Admin only)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Dnyaneshwar Patange](https://github.com/dnyaneshwarpatange)

## 🙏 Acknowledgments

- Firebase for providing the backend infrastructure
- TailwindCSS for the beautiful UI components
- Framer Motion for the smooth animations
- The open-source community for their amazing tools and libraries
