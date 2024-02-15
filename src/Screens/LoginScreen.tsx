import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import { StylesSettings } from '../Styles/StylesSettings'
import { PresentationBox } from '../Components/PresentationBox';

export const LoginScreen = () => {
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');


    return (
        <View style={StylesSettings.mainContainer}>
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
                <TouchableOpacity >
                    <Text style={StylesSettings.SubText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <View style={StylesSettings.ContainerButton}>
                    <TouchableOpacity >
                        <LinearGradient
                            colors={['#00668C', '#D4EAF7']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StylesSettings.InputButtom}
                        >
                            <Text style={StylesSettings.TextButton} >Entrar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={StylesSettings.SubText}>¿No tienes cuenta? Registrate aquí.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
