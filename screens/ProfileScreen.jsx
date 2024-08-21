import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';
const ProfileScreen = ({navigation}) => {
    const user=useSelector((state)=>state.loggedInUser);
    const dispatch=useDispatch();
    const handleLogout= async()=>{
        await AsyncStorage.removeItem('loggedInUser')
        dispatch({
            type: "LOGOUT",
          })
          navigation.navigate("Welcome");
    }
  return (
    <SafeAreaView className="bg-white">
        <View className="flex-row items-center justify-between">
        <View className="flex-row p-4 items-center gap-2">
            <Text className="font-bold text-xl">{user.loggedInUser.username}</Text>
            <Ionicons name="chevron-down-outline" size={20}/>
        </View>
        <View className="flex-row p-4 items-center gap-4">
        <Ionicons name="link-outline" size={30} />
            <Ionicons name="add-circle-outline" size={30}/>
            <Ionicons name="reorder-three-outline" size={30} />
        </View>
        </View>
    </SafeAreaView>
    // <View className="flex-1 items-center justify-center">
    //   <Text>Profile</Text>
    //   <Text>{user.loggedInUser.email}</Text>
    //   <CustomButton title="Log Out" onPress={()=>handleLogout()}/>
    // </View>
  )
}

export default ProfileScreen