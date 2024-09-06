import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import images from "../../constants/images"

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To track the loading state

  // Show loading screen for 2 seconds
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
      setMessages([{ sender: 'system', text: 'Welcome to Book My Ticket, how can I help you?' }]);
      setOptionsVisible(true); 
    }, 2000); 

    return () => clearTimeout(loadingTimeout); 
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
      {isLoading ? (
        // Loading spinner (or loading text)
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-lg">Welcome To Book My Ticket</Text>
        </View>
      ) : (
        <>
          {/* Chat messages */}
          <ScrollView className="flex-1 mt-10">
            {messages.map((message, index) => (
              <View
                key={index}
                className={`flex-row ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {/* Avatar */}
                {message.sender === 'system' && (
                  <Image
                    source={images.chatbot} // Replace with actual system avatar
                    className="w-10 h-10 rounded-full mr-2"
                  />
                )}
                {message.sender === 'user' && (
                  <Image
                    source={images.user_avatar} // Replace with actual user avatar
                    className="w-10 h-10 rounded-full ml-2"
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
        </>
      )}
    </View>
  );
};

export default ChatPage;
