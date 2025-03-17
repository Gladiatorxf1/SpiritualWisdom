import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Bot as Lotus, Feather, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ComingSoonPageProps {
  tradition: 'Sikhism' | 'Buddhism';
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ tradition }) => {
  const { isDarkMode } = useTheme();
  
  const getTraditionIcon = () => {
    switch (tradition) {
      case 'Sikhism':
        return <Feather size={64} className="text-yellow-500" />;
      case 'Buddhism':
        return <Sparkles size={64} className="text-blue-500" />;
      default:
        return <Lotus size={64} className="text-orange-500" />;
    }
  };
  
  const getTraditionColor = () => {
    switch (tradition) {
      case 'Sikhism':
        return isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100';
      case 'Buddhism':
        return isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100';
      default:
        return isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100';
    }
  };
  
  const getTraditionDescription = () => {
    switch (tradition) {
      case 'Sikhism':
        return "We're working on bringing you the wisdom of Guru Nanak and the teachings of the Guru Granth Sahib. The Sikh section will include interactive chats, key teachings, and resources to help you understand this profound tradition.";
      case 'Buddhism':
        return "We're preparing to share the wisdom of the Buddha, including the Four Noble Truths and the Eightfold Path. The Buddhism section will feature interactive learning tools, meditation guidance, and explanations of key Buddhist concepts.";
      default:
        return "We're working on bringing you more spiritual wisdom soon.";
    }
  };
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8 text-center`}>
        <div className="flex justify-center mb-6">
          <div className={`${getTraditionColor()} p-6 rounded-full`}>
            {getTraditionIcon()}
          </div>
        </div>
        
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          {tradition} Wisdom Coming Soon
        </h1>
        
        <div className="flex items-center justify-center mb-6">
          <Clock className="text-gray-400 mr-2" size={24} />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Under Development
          </p>
        </div>
        
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
          {getTraditionDescription()}
        </p>
        
        <div className={`${getTraditionColor()} p-6 rounded-lg mb-8`}>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-3`}>
            What to Expect
          </h2>
          <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2 text-left max-w-md mx-auto`}>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Interactive chat with AI-powered spiritual guides</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Key teachings and explanations of sacred texts</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Resources for both beginners and advanced practitioners</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Historical context and cultural significance</span>
            </li>
          </ul>
        </div>
        
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-8`}>
          In the meantime, you can explore our Hinduism section featuring the Bhagavad Gita.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-3 rounded-lg transition-colors`}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <Link 
            to="/hinduism"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Explore Bhagavad Gita
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;