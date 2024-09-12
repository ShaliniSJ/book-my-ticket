import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import images from "../../constants/images";
import museumsData from "../../constants/museum";
import Icon from "react-native-vector-icons/FontAwesome";
import NavBar from "../navigation/NavBar";
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [museumOptions, setMuseumOptions] = useState([]);
  const [showPayNowButton, setShowPayNowButton] = useState(false);
  const [payMessageIndex, setPayMessageIndex] = useState(null); // To track which message should show the button

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setMessages([
        {
          sender: "system",
          text: "Welcome to Book My Ticket, how can I help you?",
        },
      ]);
      setOptionsVisible(true);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handlePayment = () => {
    const upiUrl = `upi://pay?pa=shalinisrinivasan72@okaxis&pn=Book my ticket&mc=0000&tr=TXNID12345&tn=Payment for Tickets&am=500&cu=INR`;

    // Try to open the UPI payment app with the above URL
    Linking.openURL(upiUrl)
      .then(() => {
        // After payment, simulate the message that the payment was successful
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text: "Navigating to the payment page...\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nPayment successful. Please download the tickets <DOWNLOADABLE PDF WITH QR>",
          },
        ]);
        setShowPayNowButton(false);
        setPayMessageIndex(null); // Reset the pay button index after payment
      })
      .catch(() => {
        // Handle the case where no UPI app is available or payment failed
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text: "Payment failed or no UPI app found. Please try again.",
          },
        ]);
      });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue.trim().toLowerCase();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputValue },
      ]);

      // Hard-coded chatbot responses based on the script
      switch (userMessage) {
        case "hi":
        case "hello":
        case "hey":
        case "hi! how are you?":
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "system", text: "Hello! I am good. How can I help you?" },
          ]);
          break;
        case "what do you want to do today?":
        case "may be visit some place":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "What about going to some place which amuses your brain?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "yeah i would be happy to go. is there such place?":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Yes, I would like to suggest places like Museums, Science City or Planetarium which would perfectly suit your requirement.",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "well done. i will visit museum then. but i don't know where is it and how to book tickets?":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Don't worry, I will take care. Just answer a few follow-up questions. Where are you located?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i am at anna nagar, chennai":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Anna Nagar is close to many exciting museums actually. On which date would you like to visit the museum?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to visit tomorrow.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Tomorrow it's Tuesday. Mostly all Museums in Chennai will be closed because of weekly holiday. Would you like to reconsider the dates or should I find museums which are open tomorrow?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "oh! okay then i would like to go on wednesday i.e. day after tomorrow.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great Choice. I am marking the date as 11th September (Wednesday). By the way, what timings would you like to spend at the place?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to spend half a day. i will go to the place by morning and i want to leave the place by afternoon 3 pm.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice, I will note the timings as 10 am to 3 pm as 10 am is the opening time for most of the museums and science centres. Is Egmore convenient for you to reach?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "egmore? no! egmore is little far for me.":
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "system", text: "Okay, Is Guindy okay for you?" },
          ]);
          setOptionsVisible(false);
          break;

        case "yeah! guindy is near to me i will be able to reach there easily.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice. Guindy Birla Planetarium would suit you the best. There are three different ticket systems there:\n1. Gold Ticket - Rs 100 per head for adults, Rs 75 for children below 12 years (Includes Entry, 3D show, Science Park, Planetarium Show, Science Exhibitions, Science Games)\n2. Silver Ticket - Rs 75 per head for adults, Rs 50 for children below 12 years (Includes Entry, 3D show, Science Park, Science Exhibitions, Science Games)\n3. Bronze Ticket - Rs 50 per head for adults, Rs 25 for children below 12 years (Includes Entry, Science Park, Science Exhibitions, Science Games)\nWhat type of ticket would you like to buy?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to buy the golden ticket":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice. How many people are accompanying you?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "3 adults and 1 child":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great. Could you mention their names, gender and age?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "rahul - male, 25; vimala - female, 21; vinitha - female, 52; raju - male, 11":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Thanks for sharing. All details stored. Would you like to pay now or pay at the venue?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "pay now":
        case "i will pay now using upi":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Would you like to proceed with payment now?",
            },
          ]);
          setOptionsVisible(false);
          setShowPayNowButton(true);
          setPayMessageIndex(messages.length); // Store the index of the current message
          break;

        default:
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: `I didn’t understand that. Please choose an option or rephrase your query.`,
            },
          ]);
          setOptionsVisible(true);
          break;
      }

      setInputValue("");
    }
  };

  return (
    <View className="flex-1 h-full bg-white">
      <ScrollView className="flex-1 h-full bg-white">
        <View className="flex-1 mt-7 bg-white">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Image
                source={images.logo7}
                resizeMode="contain"
                style={{ width: 300, height: 40 }}
              />
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <>
              {/* Header Section */}
              <View className="bg-orange">
                <TouchableOpacity
                  className="mx-2 my-[2%]"
                  onPress={() => navigation.navigate("home")}
                >
                  <Icon name="arrow-left" color={"white"} size={18}>
                    {" "}
                    <Text className="text-white text-buttonText text-2xl font-bold">
                      ChatBot
                    </Text>
                  </Icon>
                </TouchableOpacity>
              </View>

              {/* Chat messages */}
              <ScrollView className="flex-1 my-3 mx-2">
                {messages.map((message, index) => (
                  <View
                    key={index}
                    className={`flex-row ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } my-2`}
                  >
                    {message.sender === "system" && (
                      <View className="flex-row mr-10">
                        <Image
                          source={images.chatbot}
                          className="w-10 h-10 rounded-full mr-2"
                        />

                        <View className="p-2 rounded-lg bg-gray-300 max-w-[90%]">
                          <Text className="text-black">{message.text}</Text>
                        </View>
                      </View>
                    )}
                    {message.sender === "user" && (
                      <View className="flex-row">
                        <View className="p-2 rounded-lg bg-orange">
                          <Text className="text-white">{message.text}</Text>
                        </View>
                        <Image
                          source={images.user_avatar}
                          className="w-10 h-10 rounded-full ml-2"
                        />
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </>
          )}
          {showPayNowButton && (
            <View className="items-center my-4">
              <TouchableOpacity
                className="w-[70%] bg-orange p-3 rounded-lg"
                onPress={handlePayment}
              >
                <Text className="text-white text-center text-lg">Pay Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="left-0 right-0 p-4 bg-white border-t border-gray-300">
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

      <NavBar />
    </View>
  );
};

export default ChatPage;
