import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import  MaskedView  from '@react-native-masked-view/masked-view';
import images from '../constants/images';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={images.front3} // Replace with your background image
      resizeMode="stretch"
      style={{ flex: 1 }}
    >
      <SafeAreaView className="h-full w-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <View className='flex-1 justify-end mx-[3%]'>
            <Image className='w-[70%] h-[5%] self-center' source={images.logo7} resizeMode='stretch'/>
            <View className="items-center justify-center mt-[3%]">
              <Text className="text-4xl text-textPrimary font-itRegular text-center">
                DISCOVER THE INCREDIBLE MOMENTS OF 
              </Text>
              <MaskedView
                  maskElement={
                    <Text className="text-4xl font-itRegular text-center ">
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

            {/* Logo */}
            <Image source={images.logo6} resizeMode='contain' className="w-[40%] h-[5%] mt-[2%] self-center"/>

            {/* get Started Button */}
            <CustomButton
              title="Let's Get Started"
              handlePress={() => router.push('/sign-in')}
              containerStyles="from-primary to-secondary mx-[10%] mt-[3%] mb-[7%] rounded-full"
              textStyles="text-buttonText font-bold text-white"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}