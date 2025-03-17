import React, { useState, useEffect } from 'react';
import { BookOpenText, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <BookOpenText size={32} className="text-yellow-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Coming Soon</h1>
        </div>

        <div className="text-center py-12">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            We're working on bringing you an interactive chat experience with the teachings of the Guru Granth Sahib.
            This feature will be available soon.
          </p>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-6 rounded-lg inline-block`}>
            <AlertCircle className="text-yellow-600 mx-auto mb-4" size={48} />
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              In the meantime, you can explore our other sections to learn more about Sikhism.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;