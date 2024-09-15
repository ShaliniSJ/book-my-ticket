import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import images from "../../constants/images"; // Ensure the image path is correct and accessible
// assets\images\qrcode.png
const TicketTemplate = () => {
  const name="B M Birla Planetarium"
  const location="Guindy, Chennai"
  const Nooftickets=5
  const noofadults=3
  const noofchildren=2
  const cost=150
  const Date="11/09/2024"
  const Event="Visitor"
  return (
    <ScrollView className="bg-gray-100 flex-1">
      <View className="flex-1 items-center justify-center p-4 h-[100%]">
        <View className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300 w-[60%]  max-w-md">
          {/* Header Image */}
          <View className="items-center">
            <Image
            source={images.logo7}
            className="w-full h-5 rounded-t-xl mb-4"
            resizeMethod='contain'
            />
            <Image
              source={images.ticket} // Replace with your actual image source
              className="w-full h-48 rounded-t-xl"
              resizeMode="contain"
            />
            <Image
              source={images.qrcode} // Replace with your actual image source
              className="w-full h-48 rounded-t-xl"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-center text-xl font-bold text-gray-800 mb-0">
           {name}
          </Text>

          {/* Description */}
          <Text className="text-center text-sm text-gray-600 mb-0">
            {location}
          </Text>
          <Text className="text-center text-sm text-gray-600 mb-0">
            {Date}
          </Text>

          {/* Ticket Details */}
          <View className="border-t border-gray-300 pt-4">
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-xs text-gray-500">Tickets:</Text>
                <Text className="text-lg text-gray-800 font-semibold">{Nooftickets}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xs text-gray-500">Adults:</Text>
                <Text className="text-lg text-gray-800 font-semibold">{noofadults}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xs text-gray-500">Child:</Text>
                <Text className="text-lg text-gray-800 font-semibold">{noofchildren}</Text>
              </View>
            </View>
          </View>

          {/* Event Info
          <View className="flex-row justify-between mt-6 px-4">
            <Text className="text-l text-gray-500">Event Name </Text>
            <Text className="text-l text-orange font-bold">{Event}</Text>
          </View> */}
          <View className="flex-row ml-10 mt-6 px-4">
            <Text className="text-l text-gray-500">Cost</Text>
            <Text className="text-l text-orange font-bold"> ₹{cost}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketTemplate;
