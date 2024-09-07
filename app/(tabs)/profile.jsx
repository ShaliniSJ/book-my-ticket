import React, { useState } from 'react';
import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import NavBar from '../navigation/NavBar';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [name, setName] = useState('Jennifer Doe');
  const [email, setEmail] = useState('jennifer.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [address, setAddress] = useState('123 Street Name, City, Country');
  const [editing, setEditing] = useState(false);

  const navigation = useNavigation();

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    // Save updated profile information to backend
  };

  const handleLogout = () => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 mt-8 bg-white">
      <ImageBackground source={images.bg1} className="w-full h-64">
        <TouchableOpacity className='bg-orange w-10 h-10 m-2 rounded-3xl' onPress={() => navigation.navigate('home')}>
            <Image className='mt-2' source={icons.leftArrow} resizeMode="contain" style={{ width: 40, height: 20}}/>   
        </TouchableOpacity>
      </ImageBackground>
      <View className="bg-lgrey">
            <Text className="text-black text-2xl font-bold p-4">P<Text className='text-orange'>rofile</Text></Text>
      </View>
      <ScrollView className='flex-1'>
        <View className="flex-1 p-4">
          {editing ? (
            <View className="items-center">
              <TextInput
                className="w-4/5 p-3 mb-3 border border-gray-300 rounded bg-white"
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <TextInput
                className="w-4/5 p-3 mb-3 border border-gray-300 rounded bg-white"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                className="w-4/5 p-3 mb-3 border border-gray-300 rounded bg-white"
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
              <TextInput
                className="w-4/5 p-3 mb-3 border border-gray-300 rounded bg-white"
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
              />
              <TouchableOpacity onPress={handleSave} className="bg-purple-700 p-3 rounded mt-3">
                <Text className="text-white text-lg">Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row justify-between items-center w-full">
              <View className="flex-1">
                <Text className="text-2xl font-medium">{name}</Text>
                <Text className="text-lg text-gray-600">{email}</Text>
                <Text className="text-lg text-gray-600">{phone}</Text>
                <Text className="text-lg text-gray-600 mb-4">{address}</Text>
                <TouchableOpacity onPress={handleEdit} className="bg-orange p-2 w-20 rounded-full">
                  <Text className="text-white text-center text-lg font-bold">Edit</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMg_6SWkPbTM567j7I4njCqlpaeLCa9yQEA&s' }}
                className="w-24 h-24 rounded-full ml-4 mb-6"
              />
            </View>
          )}
        </View>

        {/* Logout button */}
        <View className="items-center p-4">
          <TouchableOpacity onPress={handleLogout} className="bg-red-600 p-3 rounded-xl w-1/2">
            <Text className="text-white text-center text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default ProfilePage;
