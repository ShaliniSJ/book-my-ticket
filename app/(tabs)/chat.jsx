import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput } from 'react-native';
import images from "../../constants/images";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To track the loading state
  const [inputValue, setInputValue] = useState(''); // State for text input value

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

  // Handler for sending a text message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: inputValue }
      ]);
      setInputValue(''); // Clear input field
    }
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
                {/* Avatar and Message */}
                {message.sender === 'system' && (
                  <View className="flex-row">
                    <Image
                      source={images.chatbot} // Replace with actual system avatar
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <View className="p-3 rounded-lg bg-gray-300">
                      <Text className="text-black">{message.text}</Text>
                    </View>
                  </View>
                )}
                {message.sender === 'user' && (
                  <View className="flex-row">
                    <View className="p-3 rounded-lg bg-blue-500">
                      <Text className="text-white">{message.text}</Text>
                    </View>
                    <Image
                      source={images.user_avatar} // Replace with actual user avatar
                      className="w-10 h-10 rounded-full ml-2"
                    />
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Options (shown only when they are visible) */}
          {optionsVisible ? (
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
          ) : (
            // Text Input box when options are not visible
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
              <View className="flex-row">
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <TouchableOpacity
                  onPress={handleSendMessage}
                  className="ml-2 p-2 bg-blue-500 rounded-lg justify-center items-center"
                >
                  <Text className="text-white">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ChatPage;
