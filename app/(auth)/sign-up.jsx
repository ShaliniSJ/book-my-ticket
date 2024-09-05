import { View, Text,ScrollView,Image,Alert } from 'react-native'
import React from 'react'
import { Link, router  } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState,useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'


const SignUp = () => {
  const [form,setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const [isSubmitting,setIsSubmitting]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const submit= async () => {
    if (!form.username || !form.email || !form.password) {
       Alert.alert('Error','Please fill all fields')
    }
    setIsSubmitting(true)
    try{
    
     setIsLoggedIn(true);


     router.replace('/home')
    }
    catch(e){
      Alert.alert('Error',e.message)
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <SafeAreaView className="flex-1">
    <LinearGradient
      colors={['#FF69B4', '#FFB6C1']}
      style={{ flex: 1 }}
    >
     <ScrollView contentContainerStyle="flex-grow justify-center px-4">
     <View className="bg-white/30 p-6 mx-4 my-10 rounded-lg shadow-lg">
            <Image
              source={images.logo1}
              className="w-40 h-20 self-center mb-6"
              resizeMode='contain'
            />
            <Text className="text-2xl text-black font-semibold text-center mb-6">
              Sign Up
            </Text>
          <FormField
          title="User Name"
          value={form.username}
          handleChangeText={(e)=>setForm({...form,username:e})}
          otherStyles="mt-10 ml-3 mr-3"
          
          />

          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e)=>setForm({...form,email:e})}
          otherStyles="mt-7 ml-3 mr-3"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e)=>setForm({...form,password:e})}
          otherStyles="mt-7 ml-3 mr-3"
         />

         <CustomButton
         title="Sign Up"
         handlePress={submit}
         containerStyles="mt-10 ml-3 mr-3"
         isLoading={isSubmitting}
         />
         <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-black text-lg font-pregular">Have an account already?</Text>
          <Link className="text-primary text-lg font-psemibold" href="/sign-in">SignIn </Link>
         </View>
        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SignUp