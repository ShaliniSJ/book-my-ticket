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
  },
  {
    id: 2,
    name: 'Museum B',
    location: 'City B',
    description: 'Explore the history of science and innovation...',
    category: 'Science',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzX0hWhPrjhRRiJ72w8PelsiuvtCp0-RBJg&s',
  },
  // Add more dummy museums as needed
];

const LandingPage = () => {
  const [bucketList, setBucketList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMuseums, setFilteredMuseums] = useState(museumsData);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    
    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((museum) => museum.category === category);
    }

    // Filter by search query
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

  return (
    <View className="flex-1">
      <View className='mt-8 items-center shadow-black shadow-lg bg-white'>
        {/* Logo Image */}
        <Image source={images.logo7} resizeMode="contain" style={{ width: 180, height: 40, elevation: 15}}/>
      </View>
      <ScrollView className="flex-1 bg-white">
        {/* Welcome Banner */}
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

        {/* Nearby Museums */}
        <View className="mb-4 mt-2">
          <Text className="text-orange text-2xl font-bold mx-3 mb-2">E<Text className='text-black'>xplore Nearby !</Text></Text>

          {/* Horizontal Menu Bar */}
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

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-200 p-2 mx-2 mt-2 mb-4 rounded-3xl">
          <Icon name="search" className="text-grey text-sm mx-3" />
          <TextInput
            className="flex-1"
            placeholder="Search Museums"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
          
        <Text className="text-orange text-2xl font-bold mx-3 mb-2">P<Text className="text-black">opular Ones</Text></Text>
        {filteredMuseums.map((museum) => (
          <View key={museum.id} className="bg-white p-3 rounded-lg">
            <Image source={{ uri: museum.image }} className="h-32 w-full rounded-lg mb-2" />
            <Text className="text-black text-lg font-bold">{museum.name}</Text>
            <Text className="text-black">{museum.location}</Text>
            <Text className="text-black text-sm">{museum.description}</Text>
            <TouchableOpacity
              onPress={() => addToBucketList(museum)}
              className="bg-orange mt-2 py-2 rounded-full"
            >
              <Text className="text-center text-base font-bold text-white">Save to Bucket List</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Bucket List (Wishlist) */}
      <View className="px-4 mb-10 bg-white">
        <Text className="text-orange text-2xl font-bold mb-2">Your <Text className='text-black'>Bucket List</Text></Text>
        {bucketList.length === 0 ? (
          <Text className="text-grey text-sm">Your bucket list is empty.</Text>
        ) : (
          bucketList.map((museum) => (
            <View key={museum.id} className="bg-white px-2 mb-4 mt-2 rounded-lg flex-row items-center">
              <Image source={{ uri: museum.image }} className="h-16 w-16 rounded-lg mr-4" />
              <View className="flex-1">
                <Text className="text-black text-lg font-bold">{museum.name}</Text>
                <Text className="text-black text-sm">{museum.description}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromBucketList(museum.id)}>
                <Image source={icons.trash} className="h-6 w-6" />
              </TouchableOpacity>
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




{/* Language Switch Dropdown */}
{/* <View className="border border-gray-300 rounded-lg bg-white">
<Picker selectedValue={language} style={{ height: 50, width: 150 }} onValueChange={(itemValue) => setLanguage(itemValue)}>
  <Picker.Item label="English" value="English" />
  <Picker.Item label="Tamil" value="Tamil" />
  <Picker.Item label="Hindi" value="Hindi" />
</Picker>
</View> */}