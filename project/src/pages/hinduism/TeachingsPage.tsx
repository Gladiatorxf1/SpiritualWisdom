import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";
import { apiService, ChapterSummary, Chapter } from '../../services/api';

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
        
        // Fallback data if API fails
        const fallbackChapters = [
          { chapter: 1, title: "Arjuna's Dilemma", verseCount: 2, summary: "Arjuna's moral dilemma on the battlefield." },
          { chapter: 2, title: "Transcendental Knowledge", verseCount: 4, summary: "Krishna explains the eternal nature of the soul." },
          { chapter: 3, title: "Karma Yoga", verseCount: 2, summary: "The path of selfless action." },
          { chapter: 4, title: "Transcendental Knowledge", verseCount: 2, summary: "Krishna reveals his divine nature." },
          { chapter: 5, title: "Karma Yoga - Action in Krishna Consciousness", verseCount: 2, summary: "Renunciation and action are the same for the enlightened." },
        ];
        
        setChapters(fallbackChapters);
        
        // Set a fallback selected chapter
        setSelectedChapter({
          chapter: 1,
          title: "Arjuna's Dilemma",
          summary: "Arjuna sees friends and relatives on the opposing army and is overcome with grief and moral dilemma. He refuses to fight and seeks Krishna's guidance.",
          verses: [
            {
              verse: "I see adverse omens, O Keshava. I do not see any good in killing my own people in battle.",
              chapter: 1,
              verseNumber: 31,
              explanation: "Arjuna expresses his reluctance to fight against his own relatives and teachers, showing his compassion and moral dilemma."
            },
            {
              verse: "How can we be happy after killing our own relatives? Even though they, with minds overcome by greed, do not see the evil in destroying the family.",
              chapter: 1,
              verseNumber: 38,
              explanation: "Arjuna questions how happiness can come from violence against one's own family, even if they are blinded by greed."
            }
          ]
        });
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
      
      // If we have fallback data for this chapter, use it
      const fallbackChapter = getFallbackChapter(chapterNum);
      if (fallbackChapter) {
        setSelectedChapter(fallbackChapter);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback data function
  const getFallbackChapter = (chapterNum: number): Chapter | null => {
    const fallbackChapters: Record<number, Chapter> = {
      1: {
        chapter: 1,
        title: "Arjuna's Dilemma",
        summary: "Arjuna sees friends and relatives on the opposing army and is overcome with grief and moral dilemma. He refuses to fight and seeks Krishna's guidance.",
        verses: [
          {
            verse: "I see adverse omens, O Keshava. I do not see any good in killing my own people in battle.",
            chapter: 1,
            verseNumber: 31,
            explanation: "Arjuna expresses his reluctance to fight against his own relatives and teachers, showing his compassion and moral dilemma."
          },
          {
            verse: "How can we be happy after killing our own relatives? Even though they, with minds overcome by greed, do not see the evil in destroying the family.",
            chapter: 1,
            verseNumber: 38,
            explanation: "Arjuna questions how happiness can come from violence against one's own family, even if they are blinded by greed."
          }
        ]
      },
      2: {
        chapter: 2,
        title: "Transcendental Knowledge",
        summary: "Krishna begins his teachings by explaining the eternal nature of the soul and the temporary nature of the body. He introduces the concepts of Karma Yoga and equanimity.",
        verses: [
          {
            verse: "For the soul there is never birth nor death. Nor, having once been, does he ever cease to be. He is unborn, eternal, ever-existing, undying and primeval.",
            chapter: 2,
            verseNumber: 20,
            explanation: "This verse describes the immortal nature of the soul (Atman), which exists beyond physical birth and death."
          },
          {
            verse: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
            chapter: 2,
            verseNumber: 47,
            explanation: "This is the essence of Karma Yoga - performing one's duty without attachment to results, focusing on the action rather than the outcome."
          }
        ]
      }
    };
    
    return fallbackChapters[chapterNum] || null;
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
            to="/chat" 
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