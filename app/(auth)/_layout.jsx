import { View, Text,Image} from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'



const AuthLayout = () => {
  return (
    <>
    
    <Stack>
      <Stack.Screen
      name="sign-in"
      options={{
        headerShown:false}}
        />
        <Stack.Screen
      name="sign-up"
      options={{
        headerShown:false}}
        />
    </Stack>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout