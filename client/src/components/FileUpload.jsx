// FileUpload.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFile, storeFileInfo } from '../firebase/storageService';
import { v4 as uuidv4 } from 'uuid';

const FileUpload = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [expirationTime, setExpirationTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_EXPIRATION_HOURS = 24;
  const MAX_EXPIRATION_MINUTES = 1440;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.98 }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setFileUrl('');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds 10 MB limit. Please choose a smaller file.");
      return;
    }

    if (!expirationTime || parseInt(expirationTime, 10) <= 0) {
      alert("Please enter a valid expiration time.");
      return;
    }

    if (timeUnit === 'hours' && expirationTime > MAX_EXPIRATION_HOURS) {
      alert(`Maximum expiration time in hours is ${MAX_EXPIRATION_HOURS}.`);
      return;
    }

    if (timeUnit === 'minutes' && expirationTime > MAX_EXPIRATION_MINUTES) {
      alert(`Maximum expiration time in minutes is ${MAX_EXPIRATION_MINUTES}.`);
      return;
    }

    setUploading(true);
    try {
      const { url, fileId } = await uploadFile(selectedFile);
      const multiplier = timeUnit === 'hours' ? 3600000 : 60000;
      const expirationTimeStamp = Date.now() + parseInt(expirationTime, 10) * multiplier;

      await storeFileInfo(fileId, url, expirationTimeStamp);
      setFileUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopyLink = () => {
    if (!fileUrl) {
      alert("No file URL available to copy!");
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fileUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link."));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = fileUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg mx-auto my-4 sm:my-10 border border-blue-100 dark:border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-blue-900 dark:text-blue-100 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
        Upload Your File
      </h2>
      
      <div 
        className={`mb-6 sm:mb-8 p-4 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-dashed transition-colors duration-200 ease-in-out
          ${dragActive 
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-gray-800' 
            : 'border-blue-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-gray-600'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-3 sm:pt-5 pb-4 sm:pb-6">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-2 text-base sm:text-lg text-blue-700 dark:text-blue-300 text-center">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs sm:text-sm text-blue-500 dark:text-blue-400 text-center">
              {selectedFile ? selectedFile.name : 'Any file up to 10MB'}
            </p>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            aria-label="File upload"
          />
        </label>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-medium text-blue-900 dark:text-blue-100 mb-2 sm:mb-3">
          Expiration Time
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="number"
            placeholder="Set expiration"
            value={expirationTime}
            onChange={(e) => setExpirationTime(e.target.value)}
            aria-label="Expiration time"
            className="mb-3 sm:mb-0 flex-1 p-2 sm:p-3 rounded-lg sm:rounded-xl text-blue-900 bg-white dark:bg-gray-800 dark:text-blue-100 border border-blue-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            step="1"
            min="1"
            max={timeUnit === 'hours' ? MAX_EXPIRATION_HOURS : MAX_EXPIRATION_MINUTES}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            aria-label="Select time unit"
            className="p-2 sm:p-3 rounded-lg sm:rounded-xl text-blue-900 bg-white dark:bg-gray-800 dark:text-blue-100 border border-blue-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
          Max {timeUnit === 'hours' ? MAX_EXPIRATION_HOURS : MAX_EXPIRATION_MINUTES} {timeUnit}
        </p>
      </div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={fileUrl ? handleCopyLink : handleUpload}
        disabled={uploading || (fileUrl ? false : !selectedFile || !expirationTime)}
        className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold transition-all duration-200
          ${fileUrl 
            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          } 
          text-white shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </div>
        ) : fileUrl ? 'Copy File Link' : 'Upload File'}
      </motion.button>

      {fileUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700"
        >
          <p className="text-base sm:text-lg font-medium text-blue-900 dark:text-blue-100 text-center">Your file is ready!</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Open File
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Link
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;