import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Feather, Sun, Moon, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-600 p-4 rounded-full">
            <Feather size={48} className="text-white" />
          </div>
        </div>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
          Guru Granth Sahib Wisdom
        </h1>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Discover the timeless teachings of the Sikh Gurus
        </p>
        <Link
          to="/sikhism/chat"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center mx-auto transition-all transform hover:scale-105"
        >
          <MessageCircle className="mr-2" size={20} />
          Start Your Spiritual Journey
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <FeatureCard 
          icon={<Feather className="text-yellow-600" size={32} />}
          title="Divine Wisdom"
          description="Access the profound teachings of the Guru Granth Sahib through an intuitive chat interface."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<Sun className="text-yellow-600" size={32} />}
          title="Daily Guidance"
          description="Receive spiritual insights and practical wisdom for your everyday challenges."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<Moon className="text-yellow-600" size={32} />}
          title="Inner Peace"
          description="Find tranquility and clarity through the timeless verses of the sacred text."
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8 mb-8`}>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          About the Guru Granth Sahib
        </h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          The Guru Granth Sahib is the central religious text of Sikhism, considered by Sikhs to be the final, sovereign and eternal Guru. 
          It is a voluminous text of 1430 pages that was compiled by the Sikh Gurus themselves.
        </p>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          The Guru Granth Sahib contains the teachings of the Sikh Gurus, along with the writings of various Hindu and Muslim saints. 
          It emphasizes the principles of equality, social justice, and devotion to the Divine.
        </p>
        <div className="mt-4 text-center">
          <Link to="/sikhism/about" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Learn more about the Guru Granth Sahib →
          </Link>
        </div>
      </div>

      <div className="text-center">
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          Ready to explore the wisdom of the Guru Granth Sahib?
        </p>
        <Link
          to="/sikhism/chat"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center mx-auto transition-all"
        >
          <Heart className="mr-2" size={20} />
          Begin Your Conversation
        </Link>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDarkMode: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'} rounded-xl shadow-md p-6 transition-all`}>
      <div className="mb-4">{icon}</div>
      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{title}</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

export default HomePage;