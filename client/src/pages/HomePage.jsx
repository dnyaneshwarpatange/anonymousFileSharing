// src/pages/HomePage.jsx
import React from 'react';
import FileUpload from '../components/FileUpload'; // Default import from FileUpload.jsx

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the File Upload Page</h1>
      <FileUpload />
    </div>
  );
};

export default HomePage;
