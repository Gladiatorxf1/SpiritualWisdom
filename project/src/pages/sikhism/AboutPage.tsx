import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Users, History, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AboutPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <Feather size={32} className="text-yellow-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>About the Guru Granth Sahib</h1>
        </div>

        <div className="prose max-w-none">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            The Guru Granth Sahib is the central holy religious scripture of Sikhism, regarded by Sikhs as the final, sovereign and eternal living Guru following the lineage of the ten human Gurus of the religion.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-6 rounded-lg`}>
              <div className="flex items-center gap-2 mb-3">
                <History className="text-yellow-600" size={24} />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Historical Significance</h2>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Compiled by the fifth Guru, Guru Arjan Dev Ji, and completed in 1604, the Guru Granth Sahib is a unique scripture that contains the teachings of six Sikh Gurus along with the writings of various Hindu and Muslim saints.
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-6 rounded-lg`}>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="text-yellow-600" size={24} />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Universal Message</h2>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The Guru Granth Sahib promotes universal brotherhood, equality, and social justice. Its message transcends religious boundaries and speaks to all of humanity about love, devotion, and spiritual enlightenment.
              </p>
            </div>
          </div>

          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Core Principles</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <div className="bg-yellow-100 rounded-full p-2 h-min">
                <span className="text-yellow-600 font-bold">1</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Naam Japna</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remembering God through meditation and devotional singing.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-yellow-100 rounded-full p-2 h-min">
                <span className="text-yellow-600 font-bold">2</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Kirat Karni</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Earning an honest living through ethical means.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-yellow-100 rounded-full p-2 h-min">
                <span className="text-yellow-600 font-bold">3</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Vand Chakna</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sharing with others and serving the community.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-yellow-100 rounded-full p-2 h-min">
                <span className="text-yellow-600 font-bold">4</span>
              </div>
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Sarbat da Bhala</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Working for the welfare of all humanity.</p>
              </div>
            </li>
          </ul>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-100'} p-6 rounded-lg mb-8`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Sacred Quote</h2>
            <blockquote className={`italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} border-l-4 border-yellow-600 pl-4`}>
              "There is but One God. True is His Name, creative His personality and immortal His form. He is without fear, sans enmity, unborn and self-illumined. By the Guru's grace He is obtained."
              <footer className="text-right mt-2 font-medium">— Mul Mantar, Opening verse of the Guru Granth Sahib</footer>
            </blockquote>
          </div>

          <div className="text-center">
            <Link 
              to="/sikhism/chat" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all"
            >
              <Users className="mr-2" size={20} />
              Explore Sikh Teachings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;