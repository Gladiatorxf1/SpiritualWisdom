import React from 'react';
import { BookOpenText, Users, History, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const AboutPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <BookOpenText size={32} className="text-orange-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>About the Bhagavad Gita</h1>
        </div>

        <div className="prose max-w-none">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the Indian epic Mahabharata. 
            It contains a conversation between Pandava prince Arjuna and his guide and charioteer Lord Krishna on a variety of philosophical issues.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} p-6 rounded-lg`}>
              <div className="flex items-center gap-2 mb-3">
                <History className="text-orange-600" size={24} />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Historical Context</h2>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The Bhagavad Gita is set in a narrative framework of a dialogue between Arjuna and Krishna during the Kurukshetra War. 
                Facing the duty as a warrior to fight the Dharma Yudhha or righteous war between Pandavas and Kauravas, Arjuna is counseled by Krishna to fulfill his Kshatriya (warrior) duty as a warrior and establishing Dharma.
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} p-6 rounded-lg`}>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="text-orange-600" size={24} />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Global Influence</h2>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The Bhagavad Gita's call for selfless action inspired many leaders of the Indian independence movement including Mahatma Gandhi, who referred to the Gita as his "spiritual dictionary". 
                In the modern context, it has been a source of inspiration for many business leaders, scientists, and philosophers around the world.
              </p>
            </div>
          </div>

          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Key Teachings</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <div className="bg-orange-100 rounded-full p-2 h-min">
                <span className="text-orange-600 font-bold">1</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Karma Yoga</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>The path of selfless action without attachment to results.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-orange-100 rounded-full p-2 h-min">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Bhakti Yoga</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>The path of devotion and love towards the divine.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-orange-100 rounded-full p-2 h-min">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Jnana Yoga</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>The path of knowledge and wisdom.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-orange-100 rounded-full p-2 h-min">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dhyana Yoga</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>The path of meditation and self-discipline.</p>
              </div>
            </li>
          </ul>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-100'} p-6 rounded-lg mb-8`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Famous Quote</h2>
            <blockquote className={`italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} border-l-4 border-orange-600 pl-4`}>
              "Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth. I am born in every age to protect the good, to destroy evil, and to reestablish dharma."
              <footer className="text-right mt-2 font-medium">— Lord Krishna, Bhagavad Gita 4.7-8</footer>
            </blockquote>
          </div>

          <div className="text-center">
            <Link 
              to="/chat" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all"
            >
              <Users className="mr-2" size={20} />
              Chat with Krishna
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;