import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { HomeScreenDoctor } from './Doctor/HomeScreenDoctor'
import { HomeScreenPatient } from './Patient/HomeScreenPatient'
import { HomeScreenFamiliar } from './Familiar/HomeScreenFamiliar'
import { RootStackParams } from '../Navigator/NavigatorControler'



export const HomeScreen = ( ) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    //Obtenemos el ID del Usuario a consultar
    const params = useRoute<RouteProp<RootStackParams, 'HomeScreen'>>().params;
    
    
    const [User, setUser] = useState(params.userId);
    const [TipoUser, setTipoUser] = useState();
    const [Tipo, setTipo] = useState(params.Tipo);

    
    if (Tipo === 'D') {
        return (
            <View style={{ flex: 1 }}>
                <HomeScreenDoctor User={User} Doctor={TipoUser} />
            </View>
        )
    }
    else if (Tipo === 'P') {
        return (
            <View style={{ flex: 1 }} >
                <HomeScreenPatient  />
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1 }} >
                <HomeScreenFamiliar User={User} Familiar={TipoUser} />
            </View>)
    }
}
