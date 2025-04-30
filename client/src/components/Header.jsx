import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        SecureShare
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full focus:outline-none"
        >
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;