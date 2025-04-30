// FileDownload.jsx
import React, { useState } from 'react';
import { getDownloadLink } from '../services/fileService';

const FileDownload = () => {
  const [fileId, setFileId] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setError('');
    try {
      const link = await getDownloadLink(fileId);
      setDownloadLink(link);
    } catch (error) {
      console.error('Error getting download link:', error);
      setError('Failed to get download link. Please check the file ID.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Download File</h2>
      <input
        type="text"
        placeholder="Enter file ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        className="block w-full mb-4 p-2 border rounded-lg text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
      >
        Get Download Link
      </button>
      {downloadLink && (
        <div className="mt-4">
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Download the file
          </a>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileDownload;