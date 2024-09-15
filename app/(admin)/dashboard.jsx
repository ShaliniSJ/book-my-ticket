import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit'; // For the graph
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from 'i18next'; // Assuming you're using i18next for translations

const Dashboard = () => {
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        data: [400, 600, 1700, 1000, 800, 600],
        color: () => '#4CAF50', // Adults
      },
      {
        data: [800, 500, 600, 900, 700, 1500],
        color: () => '#2196F3', // Children
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View className="flex-1">
      {/* Removed the adminPage image */}
      <View className='mt-8 items-center shadow-black shadow-lg bg-white'>
        {/* Removed Image component */}
        <Text className="text-2xl font-bold">Dashboard</Text>
      </View>
      <ScrollView className="flex-1 bg-white">
        {/* Removed ImageBackground component */}
        <ImageBackground source={images.vid1}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <View className="ml-[2%] w-full">
              <Text className="text-orange text-3xl font-bold mt-[4.5%]">{t("Welcome")},</Text>
              <Text className="text-white text-6xl font-bold mt-[0.5%]">Admin!</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Replace the image with the new design */}
        <View className='p-5 bg-white'>
          {/* Line Graph */}
          <Text className="text-2xl font-bold">Museum A</Text>
          <View className='flex-row justify-between my-3'>
            <Text style={{ color: '#2196F3' }}>Children</Text>
            <Text style={{ color: '#4CAF50' }}>Adults</Text>
          </View>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={{ marginVertical: 8 }}
          />
          <View className='flex-row justify-center mt-2'>
            <Text className="text-2xl font-bold">27,632 August</Text>
          </View>

          {/* Stats */}
          <View className='flex-row justify-between mt-5'>
            <View className='items-center'>
              <Icon name="bullseye" size={30} color="#4CAF50" />
              <Text>68% Peak days</Text>
            </View>
            <View className='items-center'>
              <Icon name="child" size={30} color="#2196F3" />
              <Text>76% Children visitors</Text>
            </View>
          </View>

          {/* Visitor Info */}
          <View className='flex-row justify-between items-center mt-5'>
            <Text className="text-2xl font-bold">10,254</Text>
            <Text style={{ color: 'red' }}>1.5% ↓</Text>
            <Text>Visitors this year</Text>
          </View>

          {/* Top Museums */}
          <View className='mt-5'>
            <Text className="text-xl font-bold">Top Museums</Text>
            {['Museum A', 'Museum B', 'Museum C', 'Museum D', 'Museum E'].map((museum, index) => (
              <View key={index} className='flex-row justify-between items-center py-2'>
                <Text>{museum}</Text>
                <Icon name="envelope" size={20} color="#000" />
              </View>
            ))}
          </View>

          {/* View more link */}
          <Text className="text-center text-blue-500 mt-5">VIEW MORE MUSEUMS</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Dashboard;