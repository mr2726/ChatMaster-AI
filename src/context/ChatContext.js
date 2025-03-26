import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'Dating Tips',
      lastMessage: 'Let\'s improve your conversation skills!',
      timestamp: new Date(),
      messages: [],
    },
    {
      id: '2',
      name: 'Flirting Guide',
      lastMessage: 'Learn the art of subtle flirting',
      timestamp: new Date(),
      messages: [],
    },
  ]);

  const addChat = (chat) => {
    setChats(prevChats => [...prevChats, { ...chat, messages: [] }]);
  };

  const updateChat = (chatId, updates) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, ...updates } : chat
      )
    );
  };

  const addMessage = (chatId, message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message.text,
              timestamp: message.timestamp,
            }
          : chat
      )
    );
  };

  const deleteChat = (chatId) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
  };

  const getChatMessages = (chatId) => {
    const chat = chats.find(chat => chat.id === chatId);
    return chat ? chat.messages : [];
  };

  return (
    <ChatContext.Provider value={{ 
      chats, 
      addChat, 
      updateChat, 
      deleteChat, 
      addMessage,
      getChatMessages 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 