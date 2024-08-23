import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPost from '../screens/AddPost';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [homeClicked, setHomeClicked]=useState("home");
  const [searchClicked, setSearchClicked]=useState("search-outline");
  const [addClicked, setAddClicked]=useState("add");
  const [loveClicked, setLoveClicked]=useState("heart-outline");
  const [userClicked, setUserClicked]=useState("person-outline");
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name={homeClicked} size={20} color="black" />
          ),
        }}
        listeners={{
          tabPress: e => {
            setHomeClicked("home")
            setSearchClicked("search-outline");
            setAddClicked("add");
            setLoveClicked("heart-outline");
            setUserClicked("person-outline");
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name={searchClicked} size={20} color="black" />
          ),
        }}
        listeners={{
          tabPress: e => {
            setHomeClicked("home-outline")
            setSearchClicked("search");
            setAddClicked("add");
            setLoveClicked("heart-outline");
            setUserClicked("person-outline");
          },
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: () => (
            <Ionicons name={addClicked} size={20} color="black" />
          ),
        }}
        listeners={{
          tabPress: e => {
            setHomeClicked("home-outline")
            setSearchClicked("search-outline");
            setAddClicked("add-circle");
            setLoveClicked("heart-outline");
            setUserClicked("person-outline");
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name={loveClicked} size={20} color="black" />
          ),
        }}
        listeners={{
          tabPress: e => {
            setHomeClicked("home-outline")
            setSearchClicked("search-outline");
            setAddClicked("add");
            setLoveClicked("heart");
            setUserClicked("person-outline");
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name={userClicked} size={20} color="black" />
          ),
        }}
        listeners={{
          tabPress: e => {
            setHomeClicked("home-outline")
            setSearchClicked("search-outline");
            setAddClicked("add");
            setLoveClicked("heart-outline");
            setUserClicked("person");
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator