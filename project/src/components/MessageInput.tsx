import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about the Bhagavad Gita..."
          className={`flex-1 ${isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500' 
            : 'bg-white border-gray-300 focus:ring-orange-500'} 
            rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`rounded-full p-2 ${
            isLoading || !message.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          } transition-colors`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;