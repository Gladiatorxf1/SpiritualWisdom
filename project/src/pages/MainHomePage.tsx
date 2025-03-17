import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Bot as Lotus, Feather, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MainHomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className={`${isDarkMode ? 'bg-purple-700' : 'bg-purple-600'} p-4 rounded-full`}>
            <BookOpenText size={48} className="text-white" />
          </div>
        </div>
        <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          Spiritual Wisdom Platform
        </h1>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
          Explore the timeless teachings and wisdom from the world's great spiritual traditions.
          Find guidance, inspiration, and insights for your spiritual journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <TraditionCard 
          title="Hinduism"
          description="Explore the wisdom of the Bhagavad Gita and the teachings of Lord Krishna."
          icon={<Lotus className={`${isDarkMode ? 'text-orange-500' : 'text-orange-600'}`} size={48} />}
          color="orange"
          path="/hinduism"
          isDarkMode={isDarkMode}
        />
        
        <TraditionCard 
          title="Sikhism"
          description="Discover the teachings of Guru Nanak and the wisdom of the Guru Granth Sahib."
          icon={<Feather className={`${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} size={48} />}
          color="yellow"
          path="/sikhism"
          isDarkMode={isDarkMode}
          comingSoon={true}
        />
        
        <TraditionCard 
          title="Buddhism"
          description="Learn about the Four Noble Truths and the Eightfold Path to enlightenment."
          icon={<Sparkles className={`${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`} size={48} />}
          color="blue"
          path="/buddhism"
          isDarkMode={isDarkMode}
          comingSoon={true}
        />
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12`}>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          About This Platform
        </h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          Our mission is to make the profound wisdom of the world's spiritual traditions accessible to everyone.
          We believe that these ancient teachings contain timeless insights that can help us navigate the challenges of modern life.
        </p>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Each tradition offers unique perspectives on the nature of reality, consciousness, ethics, and the path to inner peace.
          By exploring these diverse teachings, we can gain a deeper understanding of ourselves and our place in the universe.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
            Interactive Learning
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Engage with sacred texts through our AI-powered chat interfaces. Ask questions, seek clarification,
            and receive personalized guidance based on the wisdom of these traditions.
          </p>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
            Comprehensive Resources
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Access key teachings, explanations, and commentaries on important texts. Our platform
            provides both introductory material for beginners and deeper insights for advanced practitioners.
          </p>
        </div>
      </div>
    </div>
  );
};

interface TraditionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  isDarkMode: boolean;
  comingSoon?: boolean;
}

const TraditionCard: React.FC<TraditionCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  path, 
  isDarkMode,
  comingSoon = false 
}) => {
  const getBackgroundColor = () => {
    if (isDarkMode) return 'bg-gray-800 hover:bg-gray-700';
    
    switch (color) {
      case 'orange': return 'bg-white hover:bg-orange-50';
      case 'yellow': return 'bg-white hover:bg-yellow-50';
      case 'blue': return 'bg-white hover:bg-blue-50';
      default: return 'bg-white';
    }
  };
  
  const getBorderColor = () => {
    switch (color) {
      case 'orange': return isDarkMode ? 'border-orange-700' : 'border-orange-200';
      case 'yellow': return isDarkMode ? 'border-yellow-700' : 'border-yellow-200';
      case 'blue': return isDarkMode ? 'border-blue-700' : 'border-blue-200';
      default: return 'border-gray-200';
    }
  };
  
  return (
    <Link 
      to={path}
      className={`${getBackgroundColor()} ${getBorderColor()} border-2 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all transform hover:scale-105 relative overflow-hidden`}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
        {title}
      </h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
      
      {comingSoon && (
        <div className={`absolute top-0 right-0 ${
          color === 'orange' ? 'bg-orange-600' : 
          color === 'yellow' ? 'bg-yellow-600' : 
          'bg-blue-600'
        } text-white py-1 px-4 rounded-bl-lg text-sm font-medium`}>
          Coming Soon
        </div>
      )}
    </Link>
  );
};

export default MainHomePage;