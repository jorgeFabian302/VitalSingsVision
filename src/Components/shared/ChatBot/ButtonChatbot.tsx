import React from 'react';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
  onPress: () => void,
}

export const ButtonChatbot = ({onPress}: Props) => {
  return (
    <View style={{ position:'absolute'}}>
        <Pressable
          onPress={() => { onPress() } }
          style={{ alignItems:'flex-end' }}
        ><Text><Icon name="logo-ionitron" size={70} color="#00668C" /></Text></Pressable>
    </View>
  )
}
