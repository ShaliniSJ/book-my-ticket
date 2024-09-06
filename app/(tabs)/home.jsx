import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground  } from 'react-native';
import icons  from '../../constants/icons';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants/images';

const museumsData = [
  {
    id: 1,
    name: 'Museum A',
    location: 'City A',
    description: 'A great place to learn about art and history...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllvBIeB9gxw1IissvAozsUm2HoH22mkuzHg&s',
  },
  {
    id: 2,
    name: 'Museum B',
    location: 'City B',
    description: 'Explore the history of science and innovation...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzX0hWhPrjhRRiJ72w8PelsiuvtCp0-RBJg&s',
  },
  // Add more dummy museums as needed
];

const LandingPage = () => {
  const [bucketList, setBucketList] = useState([]);
  const navigation = useNavigation();
  const [language, setLanguage] = useState('English');

  const addToBucketList = (museum) => {
    if (!bucketList.find((item) => item.id === museum.id)) {
      setBucketList([...bucketList, museum]);
    }
  };

  const removeFromBucketList = (id) => {
    setBucketList(bucketList.filter((museum) => museum.id !== id));
  };

  return (
    <View className="flex-1">
    <ScrollView className="flex-1 bg-white">
    <View className="flex-row justify-between items-center pt-2 px-4 mt-3 bg-white w-full h-20">
        {/* Logo Image */}
        <Image
          source={images.logo8}
          resizeMode="contain"
          style={{ width: 120, height: 40 }}
        />

        {/* Language Switch Dropdown */}
        <View className="border border-gray-300 rounded-lg bg-white">
          <Picker
            selectedValue={language}
            style={{ height: 40, width: 100, }}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Tamil" value="Tamil" />
            <Picker.Item label="Hindi" value="Hindi" />
          </Picker>
        </View>
      </View>
      {/* User Info Section */}
      <ImageBackground source={images.bg1} resizeMode="cover" style={{ flex: 1 }}>
      <View className="p-4 mb-4 w-full">
        <Text className="text-orange text-5xl font-bold">Welcome,</Text>
        <Text className="text-black text-5xl font-bold">User!</Text>
        <Text className="text-black mt-2">Total Tickets: 3</Text>
        <Text className="text-black">Pending Bookings: 1</Text>
      </View>
      </ImageBackground>

      {/* Nearby Museums */}
      <View className="mb-4 mx-2">
        <Text className="text-black text-lg font-bold mb-2">Museums Near You</Text>
        {museumsData.map((museum) => (
          <View key={museum.id} className="bg-white p-4 mb-4 rounded-lg">
            <Image source={{ uri: museum.image }} className="h-32 w-full rounded-lg mb-2" />
            <Text className="text-black font-bold">{museum.name}</Text>
            <Text className="text-black">{museum.location}</Text>
            <Text className="text-black text-sm">{museum.description}</Text>
            <TouchableOpacity
              onPress={() => addToBucketList(museum)}
              className="bg-primary mt-2 py-2 rounded-lg"
            >
              <Text className="text-center text-white">Save to Bucket List</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Bucket List (Wishlist) */}
      <View>
        <Text className="text-black text-lg font-bold mb-2">Your Bucket List</Text>
        {bucketList.length === 0 ? (
          <Text className="text-secondary">Your bucket list is empty.</Text>
        ) : (
          bucketList.map((museum) => (
            <View key={museum.id} className="bg-white p-4 mb-4 rounded-lg flex-row items-center">
              <Image source={{ uri: museum.image }} className="h-16 w-16 rounded-lg mr-4" />
              <View className="flex-1">
                <Text className="text-black font-bold">{museum.name}</Text>
                <Text className="text-black text-sm">{museum.description}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromBucketList(museum.id)}>
                <Image source={icons.trash} className="h-4 w-4" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
    {/* Floating Chat Icon */}
    <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        //   padding: 15,
          borderRadius: 50,
          elevation: 5,
        }}
        onPress={() => navigation.navigate('chat')}
      >
        <Image source={icons.chats} style={{ width: 60, height: 60 }} />
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;
