import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import axiosInstance from '../service/axiosInstance';

const Feeds = () => {
  const [feeds, setFeeds]=useState([]);
  const fetchData= async()=>{
    try {
      const response = await axiosInstance.get(`/feeds`)
      setFeeds([...response.data]);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View className=" flex-1 bg-white">
      <FlatList
      data={feeds}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>{
        return (
          <View>
          <View className="flex-row items-center">
            <Image source={{uri: item.profilePicture}} style={{width: 50, height:50}}/>
            <Text>{item.username}</Text>
          </View>
          <View>
            <Image source={{uri: item.image}} style={{width: '100%', aspectRatio: 1}}/>
          </View>
          <View className="flex-row px-2">
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity className="ml-auto">
                  <Ionicons name="bookmark-outline" size={24} />
                </TouchableOpacity>
              </View>
              <View className="px-2">
                <Text className="font-semibold">
                  {item.username}{" "}
                  <Text className="font-normal">{item.caption}</Text>
                </Text>
              </View>
          </View>
        )
      }
    }
      />
    </View>
  )
}

export default Feeds