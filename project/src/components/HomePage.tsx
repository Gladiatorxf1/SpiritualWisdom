import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Bot, Sun, Moon, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-600 p-4 rounded-full">
            <Bot size={48} className="text-white" />
          </div>
        </div>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Bhagavad Gita Wisdom</h1>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Discover timeless teachings of Lord Krishna</p>
        <Link
          to="/hinduism/chat"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center mx-auto transition-all transform hover:scale-105"
        >
          <MessageCircle className="mr-2" size={20} />
          Start Your Spiritual Journey
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <FeatureCard 
          icon={<Bot className="text-orange-600" size={32} />}
          title="Divine Wisdom"
          description="Access the profound teachings of the Bhagavad Gita through an intuitive chat interface."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<Sun className="text-orange-600" size={32} />}
          title="Daily Guidance"
          description="Receive spiritual insights and practical wisdom for your everyday challenges."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<Moon className="text-orange-600" size={32} />}
          title="Inner Peace"
          description="Find tranquility and clarity through the timeless verses of the sacred text."
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8 mb-8`}>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>About the Bhagavad Gita</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the Indian epic Mahabharata. 
          It contains a conversation between Pandava prince Arjuna and his guide and charioteer Lord Krishna on a variety of philosophical issues.
        </p>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Faced with a fratricidal war, a despondent Arjuna turns to his charioteer Krishna for counsel, resulting in a profound dialogue 
          that explores duty, righteousness, spiritual freedom, and the nature of existence.
        </p>
        <div className="mt-4 text-center">
          <Link to="/hinduism/about" className="text-orange-600 hover:text-orange-700 font-medium">
            Learn more about the Bhagavad Gita →
          </Link>
        </div>
      </div>

      <div className="text-center">
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Ready to explore the wisdom of the Bhagavad Gita?</p>
        <Link
          to="/hinduism/chat"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center mx-auto transition-all"
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