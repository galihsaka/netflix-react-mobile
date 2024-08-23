import { View, Text, Button, Linking, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import axiosInstance from '../service/axiosInstance'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons';

const AddPost = () => {
  const midtransClient = require("midtrans-client");
  const [items, setItems] = useState([]);
  const price = 50000;

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/carts");
      setItems(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(()=> {
      fetchData();
    },[])
  )

  const grandTotal = items.reduce(
    (total, item) => total + price * item.quantities,
    0
  );

  const midtrans = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-_6X4KwGSnLvMGmSLgFejDUzN", // taro di .env
  });

  const handleDeleteItem = async (itemId) => {
    const filteredItem = items.filter((item) => item.id !== itemId);
    try {
      await axiosInstance.delete("/carts/"+itemId);
      setItems([...filteredItem]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePayment = async () => {
    const transactionId = `transaction-${new Date().getTime()}`;
    try {
      const transactionDetails = {
        transaction_details: {
          order_id: transactionId,
          gross_amount: grandTotal,
        },
        // Payment
        item_details: items.map((item) => ({
          id: item.id,
          price: price,
          quantity: item.quantities,
          name: item.title,
        })),
      };

      // create transaction
      const { token } = await midtrans.createTransaction(transactionDetails);
      console.log("Ini token: ", token);

      Linking.openURL(
        `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`
      );
      alert("Payment Success");
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <SafeAreaView className="flex-1">
      <View>
      <View className="flex-row justify-between">
      <Text className="font-bold text-xl m-3">Cart</Text>
      <View className="flex-row items-center justify-center mr-2" style={{gap: 10}}>
          <View className="flex-col">
          <Text className="font-bold">Grand Total</Text>
          <Text className="font-bold text-2xl">{grandTotal}</Text>
          </View>
          <Button title="Checkout" onPress={handlePayment} />
        </View>
      </View>
      <ScrollView horizontal={false}>
        {items.map((item) => {
        return (
          <View key={item.id} className="bg-white flex-row items-center mb-3">
            <Image source={{uri: 'https://image.tmdb.org/t/p/w500'+item.poster,
            }}
            width={100}
            height={160}
            />
            <View className="flex-col ml-5 w-52">
            <Text>
              {item.title}
            </Text>
            <Text>Quantity: {item.quantities}</Text>
            <Text>Subtotal: {price * item.quantities}</Text>
            {/* <View className="flex-row">
            <TouchableOpacity><Ionicons name="add-circle-outline" size={30} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="remove-circle-outline" size={30} /></TouchableOpacity>
            </View> */}
            </View>
            <View className="mr-5" style={{ marginLeft: 'auto'}}>
            <TouchableOpacity><Ionicons name="trash-outline" size={30} onPress={() => handleDeleteItem(item.id)} /></TouchableOpacity>
            </View>
          </View>
        )})}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AddPost