import { Picker } from "@react-native-picker/picker";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import images from "../../constants/images";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { signIn } from "../../api/auth"; // Import the signIn function

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, i18n } = useTranslation(); // get i18n from useTranslation
  const [language, setLanguage] = useState("English");

  const changeLanguage = (language) => {
    console.log(language);
    i18n.changeLanguage(language); // change the language in i18n
    setLanguage(language);
    console.log("engine language", i18n.language);
  };

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert(t("Error"), t("Please fill all fields"));
      return;
    }
    setIsSubmitting(true);
    try {
      // Use the signIn function from Supabase
      const result = await signIn(form.email, form.password);
      if (result.error) {
        Alert.alert("Error", result.error);
      } else {
        setIsLoggedIn(true);
        console.log(result.data);
        Alert.alert("Success", "Logged in successfully");
        if (result.data[0].is_admin) {
          router.replace("/dashboard");
        }
        else router.replace("/home");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 py-4 bg-white">
      <ScrollView contentContainerStyle="flex-grow justify-center">
        <View className="border border-gray-300 w-[35%] ml-2 rounded-lg bg-white">
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => changeLanguage(itemValue)} // Call changeLanguage
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Tamil" value="ta" />
            <Picker.Item label="Hindi" value="hi" />
          </Picker>
        </View>
        <Image
          source={images.logo7}
          className="w-60 h-20 self-center"
          resizeMode="contain"
        />

        <Text className="text-6xl text-orange font-bold text-left ml-2">
          {t("Welcome Back")}
        </Text>

        <Text className="text-xl font-regular text-left text-grey mt-2 mx-3">
          {t(
            "Sign in now to manage your tickets and receive instant updates on all your museum visits"
          )}
        </Text>

        <FormField
          title={t("Email")}
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7 mx-3"
          keyboardType="email-address"
        />
        <FormField
          title={t("Password")}
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7 mx-3"
        />
        <CustomButton
          title={t("Sign In")}
          handlePress={submit}
          containerStyles="mt-10 mx-3"
          textStyles="text-white"
          isLoading={isSubmitting}
        />
        <View className="flex-row justify-center py-5 gap-2">
          <Text className="text-black text-lg">
            {t("Don't have an account?")}
          </Text>
          <Link
            className="text-primary text-lg text-orange font-semibold"
            href="/sign-up"
          >
            {t("Sign Up")}
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
