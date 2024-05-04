import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { HomeScreenDoctor } from './Doctor/HomeScreenDoctor'
import { HomeScreenPatient } from './Patient/HomeScreenPatient'
import { HomeScreenFamiliar } from './Familiar/HomeScreenFamiliar'
import { RootStackParams } from '../Navigator/NavigatorControler'
import { Data } from '../interfaces/interfaces'



export const HomeScreen = () => {
    //Obtenemos el ID del Usuario a consultar
    const params = useRoute<RouteProp<RootStackParams, 'HomeScreen'>>().params;


    const [User, setUser] = useState<Data>(params.User);


    if (params.Tipo === 'D') {
        return (
            <View style={{ flex: 1 }}>
                <HomeScreenDoctor User={User} />
            </View>
        )
    }
    else if (params.Tipo === 'P') {
        return (
            <View style={{ flex: 1 }} >
                <HomeScreenPatient User={User} />
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1 }} >
                <HomeScreenFamiliar User={User} />
            </View>)
    }
}
