import { View, Text, ScrollView, ImageBackground,Image } from 'react-native';
import React from 'react';
import icons from '../../constants/icons'; 
import images from '../../constants/images'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from 'i18next'; // Assuming you're using i18next for translations

const Dashboard = () => {
  return (
    <View className="flex-1">
      <View className='mt-8 items-center shadow-black shadow-lg bg-white'>
        <Image source={images.logo7} resizeMode="contain" style={{ width: 180, height: 40, elevation: 15}}/>
      </View>
      <ScrollView className="flex-1 bg-white">
        <ImageBackground source={images.vid1}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <View className="ml-[2%] w-full">
              <Text className="text-orange text-3xl font-bold mt-[4.5%]">{t("Welcome")},</Text>
              <Text className="text-white text-6xl font-bold mt-[0.5%]">Admin!</Text>
              <View className="flex-row items-center gap-1 mb-[2.5%] mt-[2%]">
                {/* <Icon className="ml-[2%] text-orange" name="map-marker" size={20} /> */}
                {/* <Text className="font-bold text-lg text-white">Chennai, TamilNadu</Text> */}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

export default Dashboard;
