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
    <SafeAreaView className="flex-1 bg-white">
     <ScrollView contentContainerStyle="flex-grow justify-center px-4">
          <Image
            source={images.logo7}
            className="w-60 h-20 self-center"
            resizeMode='contain'
          />

          <Text className="text-6xl text-orange font-bold text-left ml-2">
            Hello
          </Text>

          <Text className="text-6xl text-textPrimary font-bold text-left ml-2">
            There !
          </Text>

          <Text className="text-xl font-regular text-left text-grey mt-2 mx-3">
            Create an account to manage your tickets and receive instant updates on all your museum visits
          </Text>

          <FormField
          title="User Name"
          value={form.username}
          handleChangeText={(e)=>setForm({...form,username:e})}
          otherStyles="mt-5 ml-3 mr-3"
          />

          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e)=>setForm({...form,email:e})}
          otherStyles="mt-4 ml-3 mr-3"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e)=>setForm({...form,password:e})}
          otherStyles="mt-4 ml-3 mr-3"
         />

         <CustomButton
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7 ml-3 mr-3"
          textStyles="text-white"
          isLoading={isSubmitting}
         />
         <View className="justify-center py-5 flex-row gap-2">
          <Text className="text-black text-lg font-pregular">Have an account already?</Text>
          <Link className="text-primary text-lg font-semibold text-orange" href="/sign-in">Sign In </Link>
         </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp