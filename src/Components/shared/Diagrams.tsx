import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GraphisSmall } from './GraphisSmall';


export const Diagrams = () => {
  const [colorStatus, setcolorStatus] = useState('#6ADEAC')
  return (
    <TouchableOpacity style={StylesDiagrmas.Container}>
      <View style={{ ...StylesDiagrmas.BarraStatus, backgroundColor: colorStatus }} />
      <View style={{ height: Dimensions.get('screen').height * 0.31, flex: 1 }}>
        <View>
          <Text style={{ fontSize: 17, marginLeft: 6 }}>Corazón:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, marginLeft: 6 }} >80</Text>
            <Text style={{ marginLeft: 2, marginTop: 6 }}>rpm</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 50, flex: 1 }}>
          <Text style={{ fontSize: 15 }}>Último</Text>
          <Text style={{ fontSize: 15 }}>Diagnótico:</Text>
          <View style={{ marginTop: 3, alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>02/01/2024</Text>
            <Text style={{ fontSize: 12 }}>12:15:00</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3.5 }}>
        <Text style={{ fontSize: 25 }}>Estaus: Estable</Text>
        {/*<GraphisSmall />*/}
        <View style={{flex:1, alignItems:'center'}}>
          <Image  source={require('../../Image/Di.png')}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const StylesDiagrmas = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    marginVertical: 20,
    height: Dimensions.get('screen').height * 0.31,
    width: Dimensions.get('screen').width * 0.95,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  BarraStatus: {
    width: 10,
    height: Dimensions.get('screen').height * 0.31,
  }
})