import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native";
import Header from './Header';
import Story from './Story';
import TabBar from './TabBar';
import Feeds from './Feeds';

const HomeScreen = () => {
  const route = useRoute();
  const userData = route.params;
  return (
    <View className="flex-1">
      {/* <Text>Nice To See You, {userData.username} !</Text> */}
      <Header />
      <Story />
      <Feeds />
    </View>
  )
}

export default HomeScreen