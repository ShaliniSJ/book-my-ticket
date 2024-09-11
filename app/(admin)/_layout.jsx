import { View, Text,Image} from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import icons from '../../constants/icons';
import { StatusBar } from 'expo-status-bar';
const TabIcon=({icon,color,name,focused})=>{
  return(
    <View className="items-center justify-center gap-1">
      <Image 
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className="w-6 h-6"/>
      <Text className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
      style={{color:color}}>
          {name}
      </Text>
    </View>
  )
}
const Adminlayout = () => {
  
  return (
    <>
    <Tabs 
    screenOptions={{
      tabBarShowLabel:false,
      tabBarActiveTintColor:'#FFA001',
      tabBarInactiveTintColor:'#CDCDE0',
      tabBarStyle:{
        backgroundColor:'#161622',
        boarderTopWidth:1,
        boarderTopColor:'#232533',
        height:84
      }
    }}>
      <Tabs.Screen name="dashboard"
      options={{
        title:'Dashboard',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.home}
               color={color}
               name="Dashboard"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="add"
      options={{
        title:'Add',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.plus}
               color={color}
               name="Add"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="create"
      options={{
        title:'Create',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.plus}
               color={color}
               name="Create"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="museum"
      options={{
        title:'Museum',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.museum}
               color={color}
               name="Museum"
               focused={focused}
               />
        )
      }} />
    </Tabs>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default Adminlayout