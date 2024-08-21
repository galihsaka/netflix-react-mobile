import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = ({navigation}) => {
    const HandlePress=()=>{
        alert("Button Pressed");
    }
    const HandleRegister=()=>{
        navigation.navigate("Register");
    }
    const HandleLogin=()=>{
      navigation.navigate("Login")
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 800, fontSize: 30}}>React Native App</Text>
      <View className="flex flex-col" style={{gap: 5}}>
      <CustomButton title='Tes Alert' onPress={()=>{HandlePress()}} />
      <CustomButton title='Register' onPress={()=>{HandleRegister()}}/>
      <CustomButton title='Login' onPress={()=>{HandleLogin()}}/>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}


export default WelcomeScreen