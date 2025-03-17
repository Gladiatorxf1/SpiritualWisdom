import axios from 'axios';

// Types
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ConversationResponse {
  userMessage: Message;
  botResponse: Message;
}

export interface ChapterSummary {
  chapter: number;
  title: string;
  verseCount: number;
  summary: string;
}

export interface Chapter {
  chapter: number;
  title: string;
  summary: string;
  verses: GitaVerse[];
}

export interface GitaVerse {
  verse: string;
  chapter: number;
  verseNumber: number;
  explanation: string;
}

// Create axios instance
const api = axios.create({
  baseURL: '/api', // Use relative URL to leverage Vite's proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service
export const apiService = {
  // Get conversation history
  getConversation: async (conversationId: string): Promise<Message[]> => {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      
      // Convert string timestamps to Date objects
      return response.data.map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }));
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  },
  
  // Send a message and get response
  sendMessage: async (conversationId: string, text: string): Promise<ConversationResponse> => {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, { text });
      
      // Convert string timestamps to Date objects
      return {
        userMessage: {
          ...response.data.userMessage,
          timestamp: new Date(response.data.userMessage.timestamp)
        },
        botResponse: {
          ...response.data.botResponse,
          timestamp: new Date(response.data.botResponse.timestamp)
        }
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Get all chapters
  getChapters: async (): Promise<ChapterSummary[]> => {
    try {
      const response = await api.get('/chapters');
      return response.data;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  },
  
  // Get specific chapter
  getChapter: async (chapterNum: number): Promise<Chapter> => {
    try {
      const response = await api.get(`/chapters/${chapterNum}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chapter ${chapterNum}:`, error);
      throw error;
    }
  },
  
  // Check API health
  checkHealth: async (): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }
};