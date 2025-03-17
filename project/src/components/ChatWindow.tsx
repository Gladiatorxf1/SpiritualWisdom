import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-orange-600 text-white rounded-tr-none'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-100 rounded-tl-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}
          >
            <p className="whitespace-pre-line">{message.text}</p>
            <p className="text-xs mt-1 opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'} rounded-lg p-3 flex items-center space-x-2 rounded-tl-none`}>
            <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
            <p className="text-sm">Krishna is typing...</p>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;