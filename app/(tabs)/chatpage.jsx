import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import images from "../../constants/images";
import museumData from "../../constants/museum";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading screen
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setMessages([{ sender: 'system', text: 'Welcome to Book My Ticket, how can I help you?' }]);
      setOptions(['Museums near me', 'Book a ticket', 'Know about a museum', 'Popular attractions']);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Function to handle option selection
  const handleOptionPress = (option) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: option }
    ]);

    switch (option) {
      case 'Museums near me':
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'system', text: 'Here are some options for museums near you:' }
        ]);
        // Display related options based on museum data
        const museumNames = museumData.map(museum => museum.name);
        setOptions(museumNames);
        break;

      case 'Book a ticket':
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'system', text: 'Let’s start your booking process.' },
          { sender: 'system', text: 'Please select your location.' }
        ]);
        // Display locations based on museum data
        const locations = [...new Set(museumData.map(museum => museum.location))];
        setOptions(locations);
        break;

      case 'Know about a museum':
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'system', text: 'Which museum would you like to know about?' }
        ]);
        // Display related options based on museum data
        const museumOptions = museumData.map(museum => museum.name);
        setOptions(museumOptions);
        break;

      case 'Popular attractions':
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'system', text: 'Here are some popular attractions:' }
        ]);
        setOptions(['Attraction A', 'Attraction B', 'Attraction C']);
        break;

      // Handle museum selection to show details
      default:
        const selectedMuseum = museumData.find(museum => museum.name === option);
        if (selectedMuseum) {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'system', text: `Details for ${selectedMuseum.name}:` },
            { sender: 'system', text: `Location: ${selectedMuseum.location}` },
            { sender: 'system', text: `Description: ${selectedMuseum.description}` },
            { sender: 'system', text: `Category: ${selectedMuseum.category}` },
            { sender: 'system', text: `Duration: ${selectedMuseum.duration}` },
            { sender: 'system', text: `Ticket Prices - Adult: ${selectedMuseum.ticketPrice.adult}, Child: ${selectedMuseum.ticketPrice.child}` },
            { sender: 'system', text: `Additional Attractions: ${selectedMuseum.additionalAttractions.join(', ')}` },
            { sender: 'system', text: `Opening Time: ${selectedMuseum.openingTime}, Closing Time: ${selectedMuseum.closingTime}` }
          ]);
          // Reset to initial options after showing details
          setOptions(['Museums near me', 'Book a ticket', 'Know about a museum', 'Popular attractions']);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'system', text: `You selected: ${option}` }
          ]);
          setOptions([]); // Default to no options if the case isn't matched
        }
        break;
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {isLoading ? (
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

            {/* Options dynamically displayed as system messages */}
            {options.length > 0 && (
              <View className="mt-4">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-4 mb-2 bg-blue-500 rounded-lg"
                    onPress={() => handleOptionPress(option)}
                  >
                    <Text className="text-white text-center">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Chat;
