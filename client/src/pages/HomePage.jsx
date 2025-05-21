import React from 'react';
import FileUpload from '../components/FileUpload';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
          Welcome to SecShare
        </h1>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-blue-900 dark:text-blue-100">
          Upload your files securely and anonymously.
        </p>
        <FileUpload />
      </div>
    </div>
  );
};

export default HomePage;
