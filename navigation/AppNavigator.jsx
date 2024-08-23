import React,{ useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const checkLoggedInUser = async () => {
    try {
      // setLoading(true);
      const loggedInUser = await AsyncStorage.getItem("loggedInUser");
      if (loggedInUser) {
        dispatch({
          type: "LOGIN",
          payload: JSON.parse(loggedInUser),
        });

        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator 
    initialRouteName={user.loggedInUser?.id ? "Tab" : "Welcome"}
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default AppNavigator