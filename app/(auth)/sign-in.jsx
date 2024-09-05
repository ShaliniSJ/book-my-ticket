import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';

import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      // Mock login functionality
      setIsLoggedIn(true);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/explore');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#F3CFC6', '#FFB6C1']}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle="flex-grow justify-center px-4">
          <View className="bg-white/30 p-6 mx-4 my-20 rounded-lg shadow-lg">
            <Image
              source={images.logo1}
              className="w-40 h-20 self-center mb-6"
              resizeMode='contain'
            />
            <Text className="text-2xl text-black font-semibold text-center mb-6">
              Log in
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7 mx-3"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7 mx-3"
            />
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-10 mx-3"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center pt-5 gap-2">
              <Text className="text-primary-light text-lg">Don't have an account?</Text>
              <Link className="text-primary-dark text-lg font-semibold" href="/sign-up">Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignIn;
