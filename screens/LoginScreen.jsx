import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import axiosInstance from '../service/axiosInstance'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({navigation}) => {
  const dispatch=useDispatch();
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const handleLoginSubmit=async()=>{
      if (username === "" || password === "") {
        alert("Username or Password cannot be empty");
        return;
      }
      try {
        const response = await axiosInstance.get(`/users`, {
          params: { username },
        });
  
        const user = response.data[0];
  
        if (!user || user.password !== password) {
          alert("Invalid username or password");
          return;
        }
        setUsername("")
        setPassword("")
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user))
        dispatch({
          type: "LOGIN",
          payload: user,
        })
        navigation.navigate("Tab", {
          screen: "Home",
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
    <View>
      <Text className="font-bold text-xl">Login To My App</Text>
    </View>
    <View className="flex-1 w-3/4" style={{gap: 10}}>
    <View>
        <Text>Username</Text>
        <TextInput value={username} onChangeText={setUsername} placeholder='Username...' className="bg-gray-300" />
    </View>
    <View>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='Password...' className="bg-gray-300" />
    </View>
    <CustomButton title="Log In" onPress={handleLoginSubmit}/>
    </View>
    </SafeAreaView>
  )
}

export default LoginScreen