import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';
import { RootStackParams } from '../Navigator/NavigatorControler';
import { ButtonChatbot } from '../Components';


export const LoginScreen = () => {
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const [Tipo, setTipo] = useState();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const FunHomeScreen = async () =>{
        // Hacemos la consulta hacia la base de datos y si obtenemos una 
        // repuesta de tipo 200 entonces mandamos el id  a la pantalla HomeScreen
        navigation.navigate('HomeScreen', {userId: '01-UPeDi1920',  Tipo:'P'})
        const response = await globalThis.fetch('http://10.0.2.2:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdUser:  "pedroa492@gmail.com", Password:  "as453..7"}),
        });
        const responseData = await response.json();
        console.log(responseData);
        
    }

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
                <View style={StylesSettings.ContainerButton}>
                    <TouchableOpacity onPress={ FunHomeScreen }>
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
                <TouchableOpacity activeOpacity={1} onPress={ () => navigation.navigate('CreateCountScreen') }>
                    <Text style={StylesSettings.SubText}>¿No tienes cuenta? Registrate aquí.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
