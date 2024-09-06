import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import  MaskedView  from '@react-native-masked-view/masked-view';

// Import your image background
import images from '../constants/images';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={images.front3} // Replace with your background image
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ height: '100%', paddingTop: '115%'}}>
          <View className="flex-1 m-2">
            <Image
              source={images.logo7} // Replace with your logo
              style={{ width: 300, height: 40, alignSelf: 'center', marginBottom: 25, marginLeft: 11}}
            />
            {/* App Name Header */}
                 {/* Logo */}
              {/* <Image
              source={images.logo6} // Replace with your logo
              style={{ width: 150, height: 30, alignSelf: 'center', marginTop: 10}}
            /> */}
            <View className="items-center justify-center">
              <Text className="text-4xl text-textPrimary font-itRegular text-center">
                DISCOVER THE INCREDIBLE MOMENTS OF 
              </Text>
              <MaskedView
                  maskElement={
                    <Text className="text-4xl  font-itRegular text-center ">
                      INDIA
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#FF671F', '#f8f2ed', '#046A38']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: '100%' }}
                  >
                    <Text className="text-4xl font-itRegular text-transparent">
                      INDIA
                    </Text>
                  </LinearGradient>
                </MaskedView>
            </View>

              
         
       
            

            {/* get Started Button */}
            <CustomButton
              title="Let's Get Started"
              handlePress={() => router.push('/sign-in')}
              containerStyles="from-primary to-secondary m-10 rounded-full"
              textStyles="text-buttonText font-bold text-white"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}