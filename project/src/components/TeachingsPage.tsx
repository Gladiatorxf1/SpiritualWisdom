import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { apiService, ChapterSummary, Chapter } from '../services/api';

const TeachingsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch chapters on component mount
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        setError(null);
        const chaptersData = await apiService.getChapters();
        setChapters(chaptersData);
        
        // Load first chapter by default if available
        if (chaptersData.length > 0) {
          const chapterDetail = await apiService.getChapter(chaptersData[0].chapter);
          setSelectedChapter(chapterDetail);
        }
      } catch (err) {
        console.error('Failed to load chapters:', err);
        setError('Failed to load Bhagavad Gita chapters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);
  
  // Handle chapter selection
  const handleChapterSelect = async (chapterNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const chapterDetail = await apiService.getChapter(chapterNum);
      setSelectedChapter(chapterDetail);
    } catch (err) {
      console.error(`Failed to load chapter ${chapterNum}:`, err);
      setError(`Failed to load chapter ${chapterNum}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden p-8`}>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={32} className="text-orange-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Key Teachings of the Bhagavad Gita</h1>
        </div>

        {error && (
          <div className={`${isDarkMode ? 'bg-red-900' : 'bg-red-100'} ${isDarkMode ? 'text-red-200' : 'text-red-800'} p-4 rounded-lg mb-6 flex items-center gap-2`}>
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
          The Bhagavad Gita contains timeless wisdom on various aspects of life, spirituality, and self-realization. 
          Explore the chapters below to discover the profound teachings from this sacred text.
        </p>

        {/* Chapter selection */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Chapters of the Bhagavad Gita</h2>
          
          {loading && !chapters.length ? (
            <div className="flex justify-center py-8">
              <Loader2 size={32} className="animate-spin text-orange-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {chapters.map((chapter) => (
                <button
                  key={chapter.chapter}
                  onClick={() => handleChapterSelect(chapter.chapter)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedChapter?.chapter === chapter.chapter
                      ? 'bg-orange-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-orange-50 text-gray-800 hover:bg-orange-100'
                  }`}
                >
                  <div className="font-bold">Chapter {chapter.chapter}</div>
                  <div className="text-sm truncate">{chapter.title}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected chapter content */}
        {selectedChapter ? (
          <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-orange-200'} rounded-lg p-6`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              Chapter {selectedChapter.chapter}: {selectedChapter.title}
            </h2>
            
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              {selectedChapter.summary}
            </p>
            
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Key Verses</h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={32} className="animate-spin text-orange-600" />
              </div>
            ) : (
              <div className="space-y-6">
                {selectedChapter.verses.map((verse, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg`}>
                    <blockquote className={`italic border-l-4 border-orange-600 pl-4 mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      "{verse.verse}"
                      <footer className="text-right mt-2 font-medium">
                        — Bhagavad Gita, Chapter {verse.chapter}, Verse {verse.verseNumber}
                      </footer>
                    </blockquote>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {verse.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : loading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={32} className="animate-spin text-orange-600" />
          </div>
        ) : (
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'} p-6 rounded-lg text-center`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select a chapter to view its teachings
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link 
            to="/hinduism/chat" 
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all"
          >
            <ArrowRight className="mr-2" size={20} />
            Discuss These Teachings with Krishna
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeachingsPage;