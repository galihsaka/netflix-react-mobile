import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import axiosInstance from '../service/axiosInstance'

const RegisterScreen = ({navigation}) => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleRegisterSubmit= async ()=>{
      if (password !== confirmPassword) {
        alert("Password doesn't match");
        return;
      }
      if(username===""||password===""||email===""||confirmPassword===""){
        alert("Form Should Not Be Empty");
        return;
      }
      if(password.length<5){
        alert("Minimum Password Length Is 5");
        return;
      }
      try {
        const response = await axiosInstance.get(`/users?username=${username}`);
        if (response.data.length > 0) {
          alert("Username already exists");
          return;
        }
      } catch (error) {
        console.error(error.message);
      }
      try {
        await axiosInstance.post("/users", {
          username,
          email,
          password,
          profilePicture: "https://media.licdn.com/dms/image/v2/D5603AQH_OK9XailMrQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707734620286?e=1729728000&v=beta&t=MVEvoOZDF77KWn6cjHyCasCl_-Iz3fdY8MYYQjfqPtQ"
        });
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        navigation.navigate("Login")
      } catch (error) {
        console.error(error.message);
      }
  
    }
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
    <View>
      <Text className="font-bold text-xl">Register To My App</Text>
    </View>
    <View className="flex-1 w-3/4" style={{gap: 10}}>
    <View>
        <Text>Username</Text>
        <TextInput value={username} onChangeText={setUsername} placeholder='Username...' className="bg-gray-300" />
    </View>
    <View>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder='Email...' className="bg-gray-300" />
    </View>
    <View>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='Password...' className="bg-gray-300" />
    </View>
    <View>
        <Text>Confirmn Password</Text>
        <TextInput secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Confirm Password...' className="bg-gray-300" />
    </View>
    <CustomButton title="Sign Up" onPress={handleRegisterSubmit}/>
    </View>
    </SafeAreaView>
  )
}

export default RegisterScreen