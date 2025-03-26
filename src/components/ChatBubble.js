import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChatBubble = ({ message, isUser, type, sentiment }) => {
  const getBubbleStyle = () => {
    if (isUser) {
      return styles.userContainer;
    }
    
    switch (type) {
      case 'suggestion':
        return styles.suggestionContainer;
      case 'mood_lifter':
        return styles.moodLifterContainer;
      case 'opener':
        return styles.openerContainer;
      default:
        return styles.aiContainer;
    }
  };

  const getIcon = () => {
    if (isUser) return null;
    
    switch (type) {
      case 'suggestion':
        return <MaterialIcons name="lightbulb" size={16} color="#FFA500" style={styles.icon} />;
      case 'mood_lifter':
        return <MaterialIcons name="mood" size={16} color="#4CAF50" style={styles.icon} />;
      case 'opener':
        return <MaterialIcons name="chat" size={16} color="#2196F3" style={styles.icon} />;
      default:
        return <MaterialIcons name="psychology" size={16} color="#9C27B0" style={styles.icon} />;
    }
  };

  return (
    <View style={[styles.container, getBubbleStyle()]}>
      {getIcon()}
      <Text style={[styles.message, isUser ? styles.userMessage : styles.aiMessage]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  suggestionContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
  },
  moodLifterContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
  },
  openerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  message: {
    fontSize: 16,
  },
  userMessage: {
    color: '#FFFFFF',
  },
  aiMessage: {
    color: '#000000',
  },
  icon: {
    marginRight: 8,
  },
});

export default ChatBubble; 