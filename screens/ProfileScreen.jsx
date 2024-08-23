import { View, Text, TouchableOpacity, Image, Button, Dimensions } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';
const ProfileScreen = ({navigation}) => {
  const screenWidth=Dimensions.get('window').width;
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
        <TouchableOpacity>
        <View className="flex-row p-4 items-center gap-2">
            <Text className="font-bold text-xl">{user.loggedInUser.username}</Text>
            <Ionicons name="chevron-down-outline" size={20}/>
        </View>
        </TouchableOpacity>
        <View className="flex-row p-4 items-center gap-4">
          <TouchableOpacity><Ionicons name="link-outline" size={30} /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="add-circle-outline" size={30}/></TouchableOpacity>
          <TouchableOpacity><Ionicons name="reorder-three-outline" size={30} /></TouchableOpacity>
        </View>
        </View>
        <View className="flex-row items-center gap-7 pl-4">
          <Image source={{uri: user.loggedInUser.profilePicture}} width={80} height={80} borderRadius={100} />
          <View className="flex-col items-center">
            <Text className="font-bold text-xl">11</Text>
            <Text className="text-sm">postingan</Text>
          </View>
          <View className="flex-col items-center">
            <Text className="font-bold text-xl">140</Text>
            <Text className="text-sm">pengikut</Text>
          </View>
          <View className="flex-col items-center">
            <Text className="font-bold text-xl">130</Text>
            <Text className="text-sm">mengikuti</Text>
          </View>
        </View>
        <Text className="font-bold ml-4">{user.loggedInUser.email}</Text>
        <View className="flex-row justify-center mt-5" style={{gap: 10}}>
        <Button title='Edit Profil' color={"grey"}/>
        <Button title='Bagikan Profil' color={"grey"}/>
        <Button title="Log Out" onPress={()=>handleLogout()} color={"red"}/>
        </View>
        <View className="flex-row justify-center items-center mt-10" style={{gap: 100}}>
        <Ionicons name="apps-outline" size={30} color="black" />
        <Ionicons name="play-circle-outline" size={30} color="black" />
        <Ionicons name="people-outline" size={30} color="black" />
        </View>
        <View className="flex-row flex-wrap items-center mt-2" style={{gap: 1}}>
        <Image source={{uri: user.loggedInUser.profilePicture}} width={(screenWidth/3)-2} height={130} />
        <Image source={{uri: user.loggedInUser.profilePicture}} width={(screenWidth/3)-2} height={130} />
        <Image source={{uri: user.loggedInUser.profilePicture}} width={(screenWidth/3)-2} height={130} />
        <Image source={{uri: user.loggedInUser.profilePicture}} width={(screenWidth/3)-2} height={130} />
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen