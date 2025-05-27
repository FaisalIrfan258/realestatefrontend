import { useState, useEffect } from 'react';
import { sendChatbotMessage, getChatbotHistory, clearChatbotHistory } from '@/lib/api';

export type Message = {
  type: 'user' | 'bot';
  content: string;
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load session ID from localStorage on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatbotSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadChatHistory(savedSessionId);
    }
  }, []);

  // Load chat history if session ID exists
  const loadChatHistory = async (sid: string) => {
    setIsLoading(true);
    try {
      const response = await getChatbotHistory(sid);
      if (response.success && response.history.length > 0) {
        const formattedMessages: Message[] = [];
        response.history.forEach((item) => {
          formattedMessages.push({ type: 'user', content: item.user });
          formattedMessages.push({ type: 'bot', content: item.bot });
        });
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message to chatbot
  const sendMessage = async (message: string, isInitial = false) => {
    if (!message.trim() && !isInitial) return;

    // Add user message to chat
    if (!isInitial) {
      setMessages((prev) => [...prev, { type: 'user', content: message }]);
    }
    
    setIsLoading(true);

    try {
      const response = await sendChatbotMessage({
        message: isInitial ? 'Hi' : message,
        sessionId: sessionId || undefined,
      });

      if (response.success) {
        // Save session ID if it's a new conversation
        if (!sessionId) {
          setSessionId(response.sessionId);
          localStorage.setItem('chatbotSessionId', response.sessionId);
        }

        // Add bot response to chat
        setMessages((prev) => [...prev, { type: 'bot', content: response.message }]);
      } else {
        // Handle error
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: 'Sorry, I\'m having trouble connecting. Please try again later.' },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Sorry, I\'m having trouble connecting. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = async () => {
    if (sessionId) {
      setIsLoading(true);
      try {
        await clearChatbotHistory(sessionId);
        setMessages([]);
        // Keep the session ID but clear the messages
      } catch (error) {
        console.error('Error clearing chat history:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setMessages([]);
    }
  };

  // Reset the entire chat (clear history and remove session)
  const resetChat = () => {
    if (sessionId) {
      clearChatbotHistory(sessionId).catch(console.error);
    }
    localStorage.removeItem('chatbotSessionId');
    setSessionId(null);
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    clearChat,
    resetChat,
  };
} 