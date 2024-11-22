// src/components/FileDownload.jsx
import React, { useState } from 'react';
import { getDownloadLink } from '../services/fileService'; // Correct import of getDownloadLink

const FileDownload = () => {
  const [fileId, setFileId] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    try {
      const link = await getDownloadLink(fileId); // Call getDownloadLink with the fileId
      setDownloadLink(link); // Set the download link in state
    } catch (error) {
      console.error('Error getting download link:', error);
    }
  };

  return (
    <div>
      <h2>Download File</h2>
      <input 
        type="text" 
        placeholder="Enter file ID" 
        value={fileId} 
        onChange={(e) => setFileId(e.target.value)} 
      />
      <button onClick={handleDownload}>Get Download Link</button>

      {downloadLink && (
        <div>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            Download the file
          </a>
        </div>
      )}
    </div>
  );
};

export default FileDownload;
