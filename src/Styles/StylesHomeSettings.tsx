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
    ButtonDoctor:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        height: 85,
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
    DoctorContainer:{
        backgroundColor: '#FFFEFB',
        borderRadius: 100,
        marginHorizontal:25,
        height: 60, 
        width: 60,
        alignItems:'center',
        justifyContent:'center'
    },
    ContainerFlatList:{
        alignItems: 'center',
        borderRadius: 10,
        flex:1,
        width:Dimensions.get('window').width * 0.95, // Utiliza porcentaje en lugar de dimensiones fijas
    },
    ContainerList:{
        flex: 3, 
        width: Dimensions.get('window').width * 0.95,
    },
    ButtomGeneral:{
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        height: 35,
        width:Dimensions.get('window').width * 0.95, // Utiliza porcentaje en lugar de dimensiones fijas
    }
})
