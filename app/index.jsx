import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
// Import your image background
import images from "../constants/images"

export default function HomeScreen() {
  return (
    <ImageBackground
      source={images.front} // Replace with your background image
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="flex-1 justify-center items-center">
            {/* App Name Header */}
            <Text className="text-5xl text-textPrimary font-bold text-center mt-20">
              Book My Ticket
            </Text>
            <Text className="text-lg text-dark text-center mt-3">
              Unlock Adventure! One Ticket at a Time
            </Text>

            {/* Continue with Email Button */}
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="bg-gradient-to-r from-primary to-secondary mt-10 px-8 py-4 rounded-full"
              textStyles="text-buttonText text-lg font-bold"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor="transparent" style="light" />
    </ImageBackground>
  );
}
