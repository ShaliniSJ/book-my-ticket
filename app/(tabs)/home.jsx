import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import icons from '../../constants/icons';
import images from '../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../navigation/NavBar';

const museumsData = [
  {
    id: 1,
    name: 'Museum A',
    location: 'City A',
    description: 'A great place to learn about art and history...',
    category: 'Art',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllvBIeB9gxw1IissvAozsUm2HoH22mkuzHg&s',
    duration: '2-3 hours',
    ticketPrice: {
      adult: '₹200',
      child: '₹100',
    },
    additionalAttractions: ['Folk Dance', '3D Shows', 'Puppet Show'],
    openingTime: '09:00',
    closingTime: '18:00',
  },
  {
    id: 2,
    name: 'Museum B',
    location: 'City B',
    description: 'Explore the history of science and innovation...',
    category: 'Science',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzX0hWhPrjhRRiJ72w8PelsiuvtCp0-RBJg&s',
    duration: '3-4 hours',
    ticketPrice: {
      adult: '₹250',
      child: '₹150',
    },
    additionalAttractions: ['Virtual Reality Experience', 'Science Workshops', 'Planetarium Shows'],
    openingTime: '10:00',
    closingTime: '17:00',
  },
];

const isMuseumOpen = (openingTime, closingTime) => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  return currentTime >= openingTime && currentTime <= closingTime;
};

const LandingPage = () => {
  const [bucketList, setBucketList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMuseums, setFilteredMuseums] = useState(museumsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedMuseumId, setExpandedMuseumId] = useState(null);

  const addToBucketList = (museum) => {
    if (!bucketList.find((item) => item.id === museum.id)) {
      setBucketList([...bucketList, museum]);
    }
  };

  const removeFromBucketList = (id) => {
    setBucketList(bucketList.filter((museum) => museum.id !== id));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterMuseums(selectedCategory, query);
  };

  const filterMuseums = (category, query) => {
    let filtered = museumsData;
    
    if (category !== 'All') {
      filtered = filtered.filter((museum) => museum.category === category);
    }

    if (query) {
      filtered = filtered.filter(
        (museum) =>
          museum.name.toLowerCase().includes(query.toLowerCase()) ||
          museum.location.toLowerCase().includes(query.toLowerCase()) ||
          museum.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredMuseums(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterMuseums(category, searchQuery);
  };

  const toggleMoreInfo = (id) => {
    setExpandedMuseumId(expandedMuseumId === id ? null : id);
  };

  return (
    <View className="flex-1">
      <View className='mt-8 items-center shadow-black shadow-lg bg-white'>
        <Image source={images.logo7} resizeMode="contain" style={{ width: 180, height: 40, elevation: 15}}/>
      </View>
      <ScrollView className="flex-1 bg-white">
        <ImageBackground source={images.vid1} resizeMode="cover" style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <View className="ml-3 w-full">
              <Text className="text-orange text-4xl font-bold mt-5">Welcome,</Text>
              <Text className="text-white text-6xl font-bold mt-1">Jennie!</Text>
              <View className="flex-row items-center mb-4 mt-6">
                <Icon className="ml-1 text-orange" name="map-marker" size={20} />
                <Text className="font-bold text-lg text-white"> Chennai, TamilNadu</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View className="mb-4 mt-2">
          <Text className="text-orange text-2xl font-bold mx-3 mb-2">Explore Nearby !</Text>

          <ScrollView
            className="mx-2 my-2"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 2 }}
          >
            {['All', 'Art', 'Historical', 'Science', 'Archealogical', 'Transportation', 'Botanical gardens', 'Geo Parks'].map((category, index) => (
              <TouchableOpacity
              key={index}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: selectedCategory === category ? '#EA5141' : '#f0f0f0',
                marginRight: 10,
                borderRadius: 20,
              }}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={{ fontWeight: 'bold', color: selectedCategory === category ? '#fff' : '#333' }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row items-center bg-gray-200 p-2 mx-2 mt-2 mb-4 rounded-3xl">
          <Icon name="search" className="text-grey text-sm mx-3" />
          <TextInput
            className="flex-1"
            placeholder="Search Museums"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <Text className="text-orange text-2xl font-bold mx-3 mb-2">Popular Ones</Text>

      {filteredMuseums.map((museum) => (
        <View key={museum.id} className="bg-white p-3 rounded-lg mb-3">
          <Image source={{ uri: museum.image }} className="h-32 w-full rounded-lg mb-2" />
          <Text className="text-black text-lg font-bold">{museum.name}</Text>
          <Text className="text-black">{museum.location}</Text>
          <Text className="text-black text-sm">{museum.description}</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => addToBucketList(museum)}
              className="bg-orange mt-2 py-2 rounded-full flex-1 mr-2"
            >
              <Text className="text-center text-base font-bold text-white">Save to Bucket List</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleMoreInfo(museum.id)}
              className="bg-gray-500 mt-2 py-2 rounded-full flex-1"
            >
              <Text className="text-center text-base font-bold text-white">
                {expandedMuseumId === museum.id ? 'Less Info' : 'More Info'}
              </Text>
            </TouchableOpacity>
          </View>

          {expandedMuseumId === museum.id && (
            <View className="mt-2 p-3 bg-gray-100 rounded-lg">
              <View className="flex-row justify-between items-center">
              <Text className="text-black text-base font-bold">Museum Timings: {museum.openingTime} - {museum.closingTime}</Text>
                <TouchableOpacity className='rounded-lg'>
                {isMuseumOpen(museum.openingTime, museum.closingTime) ? (
                  <Text className="p-1 px-2 bg-green-600 text-white text-sm font-bold rounded-2xl">Open</Text>
                ) : (
                  <Text className="p-1 px-2 bg-red-600 text-white text-sm font-bold rounded-2xl">Closed</Text>
                )}
                </TouchableOpacity>
              </View>
              <Text className="text-black text-base font-bold">Visiting Duration: {museum.duration}</Text>
              <Text className="text-black text-base font-bold">Ticket Price:</Text>
              <Text className="text-black">Adult: {museum.ticketPrice.adult}</Text>
              <Text className="text-black">Child: {museum.ticketPrice.child}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-black font-bold text-base">Additional Attractions:</Text>
                <TouchableOpacity className='items-center justify-center bg-orange rounded-lg w-32 h-6'>
                  <Icon name='location-arrow' size={15}>
                    <Text className="text-white text-sm font-bold"> Get Directions</Text>
                  </Icon>
                </TouchableOpacity>
              </View>
              {museum.additionalAttractions.map((attraction, index) => (
                <Text key={index} className="text-black">- {attraction}</Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* Bucket List (Wishlist) */}
      <View className="px-4 mb-10 bg-white">
        <Text className="text-orange text-2xl font-bold mb-2">Your <Text className='text-black'>Bucket List</Text></Text>
        {bucketList.length === 0 ? (
          <Text className="text-grey text-sm">Your bucket list is empty.</Text>
        ) : (
          bucketList.map((museum) => (
            <View key={museum.id} className="bg-white px-2 mb-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-black font-bold">{museum.name}</Text>
                <TouchableOpacity onPress={() => removeFromBucketList(museum.id)}>
                  <Icon name="trash" className="text-red" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
    <NavBar/>
  </View>
);
};

export default LandingPage;
