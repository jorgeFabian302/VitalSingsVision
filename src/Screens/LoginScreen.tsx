import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'


import { StylesSettings } from '../Styles/StylesSettings'
import { PresentationBox } from '../Components/PresentationBox';

export const LoginScreen = () => {
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');


    return (
        <View style={ StylesSettings.mainContainer }>
            <View style={StylesSettings.containerSVG}>
                <PresentationBox />
            </View>
            <View style={StylesSettings.Container} >
                <Text style={StylesSettings.Titlee}>Login</Text>
                <TextInput
                    style={StylesSettings.InputBox}
                    placeholder='Nombre de usuario'
                    onChangeText={setUser}
                />
                <TextInput
                    style={StylesSettings.InputBox}
                    placeholder='Contraseña'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
