import { Picker } from "@react-native-picker/picker";
import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  // Handles showing loading screen after login attempt
  const [isLoading, setIsLoading] = useState(false);  // State for showing loading screen during login process
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("English");

  const changeLanguage = (language) => {
    console.log(language);
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    
    setIsLoading(true);  // Show loading screen

    // Simulate a delay to show the loading screen
    setTimeout(() => {
      setIsLoading(false);  // Hide loading screen
      setIsSubmitting(true);  // Start the login process
      try {
        // Mock login functionality
        Alert.alert("Success", "Logged in successfully");
        router.replace("/home");  // Navigate to home page
      } catch (e) {
        Alert.alert("Error", e.message);
      } finally {
        setIsSubmitting(false);
      }
    }, 3000);  // Simulate a 3-second delay for the loading screen
  };

  if (isLoading) {
    // Loading spinner and logo after "Sign In" button is pressed
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Image source={images.logo7} resizeMode="contain" style={{ width: 300, height: 40 }} />
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle="flex-grow justify-center px-4">
        <View className="border border-gray-300 mx-2 mt-2 w-32 rounded-lg bg-white">
          <Picker selectedValue={language} style={{ height: 50, width: 125 }} onValueChange={(itemValue) => setLanguage(itemValue)}>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Tamil" value="Tamil" />
            <Picker.Item label="Hindi" value="Hindi" />
          </Picker>
        </View>
        <Image
          source={images.logo7}
          className="w-60 h-20 self-center"
          resizeMode="contain"
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
          <Link
            className="text-primary text-lg text-orange font-semibold"
            href="/sign-up"
          >
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;