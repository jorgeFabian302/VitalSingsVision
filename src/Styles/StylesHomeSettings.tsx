import { Dimensions , StyleSheet } from 'react-native'

export const StylesHomeSettings = StyleSheet.create({

    mainContainer:{
        alignItems:'center',
        backgroundColor: '#FFFEFB',
        flex: 2,
      },
    ButtonUser:{
        alignItems: 'center',
        borderRadius: 20,
        height: 180,
        width:Dimensions.get('window').width * 0.95, // Utiliza porcentaje en lugar de dimensiones fijas
    },
    UserContainer:{
        backgroundColor: '#FFFEFB',
        borderRadius: 100,
        marginTop: 10, 
        height: 100, 
        width: 100,
        alignItems:'center',
        justifyContent:'center'
    },
})
