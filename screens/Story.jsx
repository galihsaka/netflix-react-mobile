import { View, Text, Image, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../service/axiosInstance';

const Story = () => {
  const user=useSelector((state)=>state.loggedInUser);
  const [stories, setStories]=useState([]);
  const fetchData= async()=>{
    try {
      const response = await axiosInstance.get(`/stories`)
      setStories([...response.data]);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View className="bg-white">
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View key={0} className="items-center m-2">
                <Image source={{uri: user.loggedInUser.profilePicture}} width={80} height={80} borderRadius={100} />
                <Text>{user.loggedInUser.username}</Text>
            </View>
      {stories.map((story)=>{
        return (
            <View key={story.id} className="items-center m-2">
                <Image source={{uri: story.profilePicture}} width={80} height={80} borderRadius={100} />
                <Text>{story.username}</Text>
            </View>
        )
      })}
      </ScrollView>
    </View>
  )
}

export default Story