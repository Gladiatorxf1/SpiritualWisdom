import React, { useState, useEffect } from 'react';
import ChatWindow from '../../components/ChatWindow';
import MessageInput from '../../components/MessageInput';
import { BookOpenText, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { apiService } from '../../services/api';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId] = useState<string>(() => {
    // Use existing conversation ID from localStorage or create a new one
    const savedId = localStorage.getItem('conversationId');
    if (savedId) return savedId;
    
    const newId = uuidv4();
    localStorage.setItem('conversationId', newId);
    return newId;
  });

  // Load conversation history on component mount
  useEffect(() => {
    const loadConversation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const conversationHistory = await apiService.getConversation(conversationId);
        setMessages(conversationHistory);
      } catch (err) {
        console.error('Failed to load conversation:', err);
        setError('Failed to load conversation. Please try again later.');
        // Fallback to initial message if API fails
        setMessages([{
          id: uuidv4(),
          text: 'Namaste! I am your Bhagavad Gita guide. Ask me anything about the teachings of Lord Krishna.',
          sender: 'bot',
          timestamp: new Date(),
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();
  }, [conversationId]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately for better UX
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.sendMessage(conversationId, text);
      
      // Add bot response
      setMessages(prev => [...prev.filter(msg => msg.id !== userMessage.id), response.userMessage, response.botResponse]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Generate a fallback response if API fails
      const fallbackResponse: Message = {
        id: uuidv4(),
        text: "I apologize, but I'm having trouble connecting to the wisdom database. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col h-[70vh]`}>
        <header className={`${isDarkMode ? 'bg-gray-700' : 'bg-orange-600'} text-white p-4 flex items-center gap-2`}>
          <BookOpenText size={24} />
          <h1 className="text-xl font-bold">Bhagavad Gita AI Guide</h1>
        </header>
        
        {error && (
          <div className={`${isDarkMode ? 'bg-red-900' : 'bg-red-100'} ${isDarkMode ? 'text-red-200' : 'text-red-800'} p-3 flex items-center gap-2`}>
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <ChatWindow messages={messages} isLoading={isLoading} />
        
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;