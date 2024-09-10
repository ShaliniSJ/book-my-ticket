import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput } from 'react-native';
import images from "../../constants/images";
import museumsData from "../../constants/museum";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../navigation/NavBar';
import { useNavigation } from '@react-navigation/native';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To track the loading state
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState(''); // State for text input value
  const [museumOptions, setMuseumOptions] = useState([]); // State to hold museum options

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
    if (option === 'Museums near me') {
      // Show the list of museums as clickable options
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: option },
        { sender: 'system', text: 'Here are some museums near you:' }
      ]);
      setMuseumOptions(museumsData.map(museum => museum.name)); // Set museum names as options
      setOptionsVisible(false);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: option },
        { sender: 'system', text: `You selected: ${option}` }
      ]);
      setOptionsVisible(false); // Hide options after selecting one
    }
  };

  // Handler for when a museum name is clicked
  const handleMuseumClick = (museumName) => {
    const selectedMuseum = museumsData.find(museum => museum.name === museumName);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: museumName },
      { sender: 'system', text: `Details for ${selectedMuseum.name}:
        \nLocation: ${selectedMuseum.location}
        \nTimings: ${selectedMuseum.timings}
        \nEntry Fee: ${selectedMuseum.entryFee}
        \nDescription: ${selectedMuseum.description}`
      }
    ]);

    setMuseumOptions([]);
  };

  // Handler for sending a text message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue.trim().toLowerCase();
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: inputValue },
      ]);
  
      // Hard-coded chatbot responses based on the script
      switch (userMessage) {
        case 'what do you want to do today?':
        case 'may be visit some place':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'What about going to some place which amuses your brain?' },
          ]);
          break;
  
        case 'yeah i would be happy to go. is there such place?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Yes, I would like to suggest places like Museums, Science City or Planetarium which would perfectly suit your requirement.' },
          ]);
          break;
  
        case 'well done. i will visit museum then. but i don\'t know where is it and how to book tickets?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Don\'t worry, I will take care. Just answer a few follow-up questions. Where are you located?' },
          ]);
          break;
  
        case 'i am at anna nagar, chennai':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Anna Nagar is close to many exciting museums actually. On which date would you like to visit the museum?' },
          ]);
          break;
  
        case 'i would like to visit tomorrow.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Tomorrow it\'s Tuesday. Mostly all Museums in Chennai will be closed because of weekly holiday. Would you like to reconsider the dates or should I find museums which are open tomorrow?' },
          ]);
          break;
  
        case 'oh! okay then i would like to go on wednesday i.e. day after tomorrow.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Great Choice. I am marking the date as 11th September (Wednesday). By the way, what timings would you like to spend at the place?' },
          ]);
          break;
  
        case 'i would like to spend half a day. i will go to the place by morning and i want to leave the place by afternoon 3 pm.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Great choice, I will note the timings as 10 am to 3 pm as 10 am is the opening time for most of the museums and science centres. Is Egmore convenient for you to reach?' },
          ]);
          break;
  
        case 'egmore? no! egmore is little far for me.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Okay, Is Guindy okay for you?' },
          ]);
          break;
  
        case 'yeah! guindy is near to me i will be able to reach there easily.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Great choice. Guindy Birla Planetarium would suit you the best. There are three different ticket systems there:\n1. Gold Ticket - Rs 100 per head for adults, Rs 75 for children below 12 years (Includes Entry, 3D show, Science Park, Planetarium Show, Science Exhibitions, Science Games)\n2. Silver Ticket - Rs 75 per head for adults, Rs 50 for children below 12 years (Includes Entry, 3D show, Science Park, Science Exhibitions, Science Games)\n3. Bronze Ticket - Rs 50 per head for adults, Rs 25 for children below 12 years (Includes Entry, Science Park, Science Exhibitions, Science Games)\nWhat type of ticket would you like to buy?' },
          ]);
          break;
  
        case 'i would like to buy the golden ticket':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Great choice. How many people are accompanying you?' },
          ]);
          break;
  
        case '3 adults and 1 child':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Great. Could you mention their names, gender and age?' },
          ]);
          break;
  
        case 'rahul - male, 25; vimala - female, 21; vinitha - female, 52; raju - male, 11':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Thanks for sharing. All details stored. Would you like to pay now or pay at the venue?' },
          ]);
          break;
  
        case 'i will pay now using upi':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'Sure, I will now navigate to payment page.\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nPayment successful. Please download the tickets <DOWNLOADABLE PDF WITH QR>' },
          ]);
          break;
  
        case 'any instructions to follow?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'All instructions are specified along with the ticket. But I will tell them again here for better convenience.\n1. Please reach the place by 10 am for full utilization of time.\n2. 3D show is scheduled between 11 am to 11.30 am\n3. Planetarium show is scheduled between 1 pm to 2 pm.\n4. Make sure you take valid Government ID for all the members along with the ticket QR either in phone or in printed hard copy\n5. Outside food and water bottles are allowed. But make sure you maintain cleanliness. We also have a canteen where visitors can buy their required snacks, water bottles and food items.\nAny other doubts, please feel free to ask me. Note your convo ID - "234781" if in case you want to continue after some time with the same context' },
          ]);
          break;
  
        case 'good! thanks...':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'You are welcome.' },
          ]);
          break;
  
        default:
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: `I'm sorry, I didn't understand that. Please try selecting one of the options or rephrase your query.` },
          ]);
          break;
      }
  
      setInputValue(''); // Clear input field
    }
  };
  

  return (
    <ScrollView className="flex-1 h-full bg-white">
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
            <TouchableOpacity className='mx-2 my-[2%]' onPress={() => navigation.navigate('home')}>
              <Icon name='arrow-left' size={18}> <Text className="text-black text-buttonText text-2xl font-bold">ChatBot</Text></Icon>
            </TouchableOpacity>
          </View>

          {/* Chat messages */}
          <ScrollView className="flex-1 my-3 mx-2">
            {messages.map((message, index) => (
              <View
                key={index}
                className={`flex-row ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}
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
                    <View className="p-3 rounded-lg bg-orange">
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

          {/* Museum options (if museums are selected) */}
          {museumOptions.length > 0 && (
            <View className="mt-4 mx-4">
              <Text className="text-center text-lg mb-2">Select a museum to see details:</Text>
              {museumOptions.map((museumName, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 mb-2 bg-teal-500 rounded-lg"
                  onPress={() => handleMuseumClick(museumName)}
                >
                  <Text className="text-white text-center">{museumName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Options (shown only when they are visible) */}
          {optionsVisible && museumOptions.length === 0 ? (
            <View className="mt-4 mx-4">
              <Text className="text-center text-lg mb-2">How can I help you?</Text>
              {['Museums near me', 'Book a ticket', 'Know about a museum', 'Popular attractions'].map(option => (
                <TouchableOpacity
                  key={option}
                  className="p-4 mb-2 bg-orange rounded-lg"
                  onPress={() => handleOptionPress(option)}
                >
                  <Text className="text-white text-center">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            // Text Input box when options are not visible
            <View className="absolute bottom-12 left-0 right-0 p-4 bg-white border-t border-gray-300">
              <View className="flex-row">
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <TouchableOpacity
                  onPress={handleSendMessage}
                  className="ml-2 p-2 bg-orange rounded-lg justify-center items-center"
                >
                  <Text className="text-white">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
      <NavBar/>
    </View>
    </ScrollView>
  );
};

export default ChatPage;