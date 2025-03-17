import React from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TeachingsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={32} className="text-yellow-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Coming Soon</h1>
        </div>

        <div className="text-center py-12">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            We're preparing a comprehensive collection of teachings from the Guru Granth Sahib.
            This section will be available soon.
          </p>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-6 rounded-lg inline-block`}>
            <AlertCircle className="text-yellow-600 mx-auto mb-4" size={48} />
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Check back later to explore the wisdom of the Sikh Gurus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingsPage;