import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import images from "../../constants/images"
import NavBar from '../navigation/NavBar';
import { useNavigation } from '@react-navigation/native';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To track the loading state
  
  const navigation = useNavigation();

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
    <View className="flex-1 mt-8 bg-white">
      {isLoading ? (
        // Loading spinner (or loading text)
        <View className="flex-1 justify-center items-center">
          <Image source={images.logo7} resizeMode="contain" style={{ width: 300, height: 40 }}/>
          <ActivityIndicator size="large" color="#000"/>
        </View>
        ) : (
        <>
          {/* Header Section */}
          <View className="bg-lgrey">
            <TouchableOpacity className='flex-row' onPress={() => navigation.navigate('home')}>
              <Image className='mt-2' source={images.arrow1} resizeMode="contain" style={{ width: 40, height: 30}}/> 
              <Text className="text-black text-2xl font-bold ml-1 py-3">C<Text className='text-orange'>hatBot</Text></Text> 
            </TouchableOpacity>
          </View>
          {/* Chat messages */}
          <ScrollView className="flex-1 my-3 mx-2">
            {messages.map((message, index) => (
              <View
                key={index}
                className={`flex-row ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}
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
            <View className="mt-4 mx-4">
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
      <NavBar/>
    </View>
  );
};

export default ChatPage;
