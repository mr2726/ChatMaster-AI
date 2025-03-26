import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChatInput = ({ onSend, onSuggest, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, disabled && styles.inputDisabled]}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        placeholderTextColor="#666"
        multiline
        editable={!disabled}
      />
      <TouchableOpacity 
        style={[styles.suggestButton, disabled && styles.buttonDisabled]} 
        onPress={onSuggest}
        disabled={disabled}
      >
        <MaterialIcons 
          name="lightbulb" 
          size={24} 
          color={disabled ? "#999" : "#007AFF"} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.sendButton, disabled && styles.buttonDisabled]} 
        onPress={handleSend}
        disabled={disabled || !message.trim()}
      >
        <MaterialIcons 
          name="send" 
          size={24} 
          color={disabled || !message.trim() ? "#999" : "#FFFFFF"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  inputDisabled: {
    backgroundColor: '#E5E5EA',
    color: '#999',
  },
  suggestButton: {
    padding: 10,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E5E5EA',
  },
});

export default ChatInput; 