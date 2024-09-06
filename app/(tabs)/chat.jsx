import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    // Show welcome message for 2 seconds
    setMessages([{ sender: 'system', text: 'Welcome to Book My Ticket!' }]);
    
    const timeout = setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'system', text: 'Welcome to Book My Ticket, how can I help you?' }
      ]);
      setOptionsVisible(true); // Show options after welcome message
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Handler when the user selects an option
  const handleOptionPress = (option) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: option },
      { sender: 'system', text: `You selected: ${option}` }
    ]);
    setOptionsVisible(false); // Hide options after selecting one
  };

  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView className="flex-1">
        {messages.map((message, index) => (
          <View
            key={index}
            className={`flex-row ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {/* Avatar */}
            {message.sender === 'system' && (
              <Image
                source={{ uri: 'https://example.com/system-avatar.png' }} // Replace with actual system avatar
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
            )}
            {message.sender === 'user' && (
              <Image
                source={{ uri: 'https://example.com/user-avatar.png' }} // Replace with actual user avatar
                style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
              />
            )}

            {/* Message bubble */}
            <View
              className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <Text className={message.sender === 'user' ? 'text-white' : 'text-black'}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Options (shown only when they are visible) */}
      {optionsVisible && (
        <View className="mt-4">
          <Text className="text-center text-lg mb-2">How can I help you?</Text>
          {['Museums near me', 'Book a ticket', 'Know about a museum', 'Popular attractions'].map(option => (
            <TouchableOpacity
              key={option}
              className="p-4 mb-2 bg-blue-500 rounded-lg"
              onPress={() => handleOptionPress(option)}
            >
              <Text className="text-white text-center">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ChatPage;
