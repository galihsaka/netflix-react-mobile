import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView className="bg-white flex-row justify-between p-4">
      <Image source={{uri: "https://logos-world.net/wp-content/uploads/2020/05/Instagram-Logo-2016-present.png"}}
      style={{width: 100, height:30}}/>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={30} color="black"/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Header