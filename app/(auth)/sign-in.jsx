import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const { t, i18n } = useTranslation();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      // Mock login functionality
      setIsLoggedIn(true);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/home');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <LinearGradient
        colors={['#f1e1c2', '#fcbc98']}
        style={{ flex: 1 }}
      > */}
        <ScrollView contentContainerStyle="flex-grow justify-center px-4">
            <Image
              source={images.logo8}
              className="w-60 h-20 self-center"
              resizeMode='contain'
            />
            <Text className="text-6xl text-orange font-bold text-left ml-2">
              {t("Welcome")}
            </Text>
            <Text className="text-6xl text-textPrimary font-bold text-left ml-2">
              Back !
            </Text>
            <Text className="text-xl font-regular text-left text-grey mt-2 mx-3">
              Sign in now to manage your tickets and receive instant updates on all your museum visits
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
              textStyles="text-white"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center pt-5 gap-2">
              <Text className="text-black text-lg">Don't have an account?</Text>
              <Link className="text-primary text-lg text-orange font-semibold" href="/sign-up">Sign Up</Link>
            </View>
        </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default SignIn;
