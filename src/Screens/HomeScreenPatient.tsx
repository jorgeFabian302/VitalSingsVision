import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import { StylesHomeSettings } from '../Styles/StylesHomeSettings';
import { Diagrams } from '../Components/Diagrams';

export const HomeScreenPatient = () => {
  return (
    <View style={StylesHomeSettings.mainContainer}>
        <View style={{marginVertical:30}}>
            <TouchableOpacity>
                <LinearGradient
                    colors={['#00668C', '#D4EAF7']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0  }}
                    style={StylesHomeSettings.ButtonUser}
                >
                    <View style={StylesHomeSettings.UserContainer}>
                        <Image  source={require('../Image/User.png')}/>
                    </View>
                    <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Bienvenido: Fabián Preciado</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        <View>
            <Diagrams />
        </View>
    </View>
  )
}


