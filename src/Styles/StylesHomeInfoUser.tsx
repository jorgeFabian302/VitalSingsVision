import { Dimensions, StyleSheet } from 'react-native'

export const StylesHomeInfoUser = StyleSheet.create({
    UserContainer: {
        backgroundColor: '#FFFEFB',
        borderRadius: 300,
        marginTop: 170,
        height: 250,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContainerLabes: {
        alignItems: 'center',
        flex: 1,
        marginTop: 15,
    },
    ContainerLabel: {
        alignItems:'center',
        height: 50,
        width: '80%',
        padding: 10,
        fontSize: 20,
        flexDirection:'row',
        marginTop: 10,
        borderRadius: 30,
        paddingStart: 30,
        backgroundColor: '#F5F4F1',
    },
    ContainerLabelText:{
        flex:8,
    },
    ContainerLabelicon:{
        flex:1,
    },
    TextLabel: {
        fontSize: 20,
        color: '#ADACAA',
    }
})
