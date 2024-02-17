import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';
import { LinearGradient } from 'react-native-linear-gradient';

export const CreateCountScreen = () => {
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Tipo, setTipo] = useState('');
  

  return (
    <View style={StylesSettings.mainContainer}>
      <ScrollView>
        <View style={StylesSettings.containerSVG}>
          <PresentationBox />
        </View>
        <View style={StylesSettings.Container}>
          <Text style={StylesSettings.Titlee}>Sing up</Text>
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Nombre(s)'
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Apellido(s)'
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Correo@ejemplo.com'
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Contraseña'
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Seleccionar tipo de usuario'
          />
          <View style={StylesSettings.ContainerButton}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00668C', '#D4EAF7']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StylesSettings.InputButtom}
              >
                <Text style={StylesSettings.TextButton} >Registrarse</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={StylesSettings.SubText}>¿Tienes cuenta? Inicia sesión aquí.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
