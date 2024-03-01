import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Diagrams = () => {
  return (
    <TouchableOpacity style={StylesDiagrmas.Container}>
        <View style={{width:10, height: Dimensions.get('screen').height * 0.31, backgroundColor: 'green'}} />

        <Text>rfrjforufivjoidfvjn</Text>
    </TouchableOpacity>
  )
}

export const StylesDiagrmas = StyleSheet.create({
  Container: {
    
    backgroundColor: 'red', 
    marginVertical: 20,
    height: Dimensions.get('screen').height * 0.31,
    width: Dimensions.get('screen').width * 0.9,     
  },
})