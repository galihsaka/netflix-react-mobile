import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Button, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import movieApi from '../api/movieApi'
import axiosInstance from '../service/axiosInstance'
import { useSelector } from 'react-redux'
const NotificationScreen = () => {
  const user=useSelector((state)=>state.loggedInUser);
  const [nowPlaying, setNowPlaying]=useState([]);
  const [modalVisible, setModalVisible]=useState(false);
  const [selectedMovie, setSelectedMovie]=useState({});
  const fetchData= async ()=>{
    try {
      const response=await movieApi.get("movie/now_playing")
      // console.log(response.data.results);
      setNowPlaying([...response.data.results])
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCart=async()=>{
    const movieId=selectedMovie.id.toString();
    const getExistingMovie=await axiosInstance.get("/carts", {
      params: {
        movieId:movieId
      }
    })
    if(getExistingMovie.data.length>0){
      try {
        await axiosInstance.patch("/carts/"+getExistingMovie.data[0].id, {
          quantities: getExistingMovie.data[0].quantities+1
        })
      } catch (error) {
        console.error(error);
      }
    }
    else{
      try {
        await axiosInstance.post("/carts",{
          userId: user.loggedInUser.id,
          movieId:movieId,
          title:selectedMovie.original_title,
          poster:selectedMovie.poster_path,
          quantities:1
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <SafeAreaView className="flex-1">
      <Text className="font-bold text-xl m-3">Now Playing</Text>
      <ScrollView horizontal={true}>
      {nowPlaying.map((movie)=>{
        return (
          <View key={movie.id} className="m-1" style={{width: 150}}>
            <TouchableOpacity onPress={()=>{setSelectedMovie(movie);setModalVisible(true)}}>
            <Image source={{uri: 'https://image.tmdb.org/t/p/w500'+movie.poster_path,
            }}
            width={150}
            height={240}
            borderRadius={10}
            />
          <Text>{movie.original_title}</Text>
          </TouchableOpacity>
          </View>
        )
      })}
      </ScrollView>
      <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{setModalVisible(false)}}>
        <View className="bg-black flex-1 flex-col gap-5">
          <Image source={{uri: 'https://image.tmdb.org/t/p/w500'+selectedMovie.backdrop_path}} width={Dimensions.get('window').width}
            height={220}/>
          <View className="flex-col items-center">  
          <Text className="text-white font-bold text-3xl">{selectedMovie.original_title}</Text>
          <Text className="text-white p-5">{selectedMovie.overview}</Text>
          </View>
          <View className="flex-row justify-center" style={{gap:10}}>
          <Button color="red" title="CLOSE" onPress={()=>{setModalVisible(false)}}/>
          <Button color="green" title="ADD TO CART" onPress={()=>{handleAddCart()}} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default NotificationScreen