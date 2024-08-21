import React from 'react'
import { Button, TouchableOpacity, Text } from 'react-native';

const CustomButton=({title, onPress})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <Text className="text-base bg-blue-600 p-2 px-9 rounded-xl text-white text-center">
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton