import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput } from 'react-native';
import images from "../../constants/images";
import museumsData from "../../constants/museum";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../navigation/NavBar';
import { useRoute, useNavigation } from '@react-navigation/native';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [museumOptions, setMuseumOptions] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const selectedLanguage = route.params?.selectedLanguage || 'English'; // Default to English if not set

  const languages = {
    english: {
      welcome: 'Welcome to Book My Ticket, how can I help you?',
      options: ['Museums near me', 'Book a ticket', 'Know about a museum', 'Popular attractions'],
      selectLanguage: 'Please select your language:',
      placeholder: 'Type your message here',
      send: 'Send',
    },
    tamil: {
      welcome: 'Book My Ticket க்கு வரவேற்கிறோம், நான் உங்களுக்கு எப்படி உதவலாம்?',
      options: ['என்னுடைய அருகிலுள்ள அருங்காட்சியங்கள்', 'டிக்கெட் பதிவு', 'ஒரு அருங்காட்சியத்தை பற்றி அறியவும்', 'பிரபலமான பார்வையாளர்கள்'],
      selectLanguage: 'தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்:',
      placeholder: 'உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்',
      send: 'அனுப்பவும்',
    },
    hindi: {
      welcome: 'Book My Ticket में आपका स्वागत है, मैं आपकी कैसे मदद कर सकता हूँ?',
      options: ['मेरे पास संग्रहालय', 'टिकट बुक करें', 'किसी संग्रहालय के बारे में जानें', 'लोकप्रिय आकर्षण'],
      selectLanguage: 'कृपया अपनी भाषा चुनें:',
      placeholder: 'यहां अपना संदेश टाइप करें',
      send: 'भेजें',
    },
  };

  // Show loading screen for 2 seconds
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Handler when the user selects an option
  const handleOptionPress = (option) => {
    const langOptions = languages[selectedLanguage.toLowerCase()];
    if (option === langOptions.options[0]) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: option },
        { sender: 'system', text: 'Here are some museums near you:' }
      ]);
      setMuseumOptions(museumsData.map(museum => museum.name));
      setOptionsVisible(false);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: option },
        { sender: 'system', text: `You selected: ${option}` }
      ]);
      setOptionsVisible(false);
    }
  };

  // Handler for sending a text message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: inputValue },
      ]);
      setInputValue('');
    }
  };

  const langOptions = languages[selectedLanguage.toLowerCase()] || languages.english;

  return (
    <View className="flex-1 h-full bg-white">
      <ScrollView className="flex-1 h-full bg-white">
        <View className="flex-1 mt-7 bg-white">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Image source={images.logo7} resizeMode="contain" style={{ width: 300, height: 40 }}/>
              <ActivityIndicator size="large" color="#000"/>
            </View>
          ) : (
            <>
              {/* Header Section */}
              <View className="bg-orange">
                <TouchableOpacity className='mx-2 my-[2%]' onPress={() => navigation.navigate('home')}>
                  <Icon name='arrow-left' size={18} color={"white"}>
                    <Text className="text-white text-buttonText text-2xl font-bold"> ChatBot</Text>
                  </Icon>
                </TouchableOpacity>
              </View>

              {/* Chat messages */}
              <View className="flex-1">
                <View className="p-4">
                  <Text>{langOptions.welcome}</Text>
                  <View className="mt-4">
                    {messages.map((message, index) => (
                      <View key={index} style={{ alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <Text style={{ padding: 10, backgroundColor: message.sender === 'user' ? '#EA5141' : '#ccc', color: '#fff', borderRadius: 10, marginVertical: 2 }}>
                          {message.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Options Menu */}
                {optionsVisible && (
                  <View className="p-4 bg-lightgrey">
                    {langOptions.options.map((option, index) => (
                      <TouchableOpacity key={index} className="p-2" onPress={() => handleOptionPress(option)}>
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Input Section */}
                <View className="p-4 flex-row">
                  <TextInput
                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, flex: 1 }}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder={langOptions.placeholder}
                  />
                  <TouchableOpacity onPress={handleSendMessage} style={{ marginLeft: 8, backgroundColor: '#EA5141', padding: 12, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>{langOptions.send}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

export default ChatPage;