import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'react-native-linear-gradient';

import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';
import { RootStackParams } from '../Navigator/NavigatorControler';





export const CreateCountScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [IdUser, setIdUser] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Password, setPassword] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Tipo, setTipo] = useState('');
  const [Cedula, setCedula] = useState('');
  const [Especialidad, setEspecialidad] = useState('');
  const [VerContra, setVerContra] = useState(true);
  const [Fecha, setFecha] = useState('Fecha de nacimiento');
  const [ShowCalendar, setShowCalendar] = useState(false);
  const [ValuesDoctor, setValuesDoctor] = useState(false);
  const [ValuesPaciente, setValuesPaciente] = useState(false);
  const [ValuesFamiliar, setValuesFamiliar] = useState(false);

  const handleTipoUsuarioChange = (value: string) => {
    setTipo(value);
    // Si se selecciona "Doctor", mostrar las opciones especiales.
    if (value === "Doctor") {
      setValuesDoctor(true);
      setValuesFamiliar(false);
      setValuesPaciente(false);
    } else if (value === 'Familiar'){
      setValuesDoctor(false);
      setValuesFamiliar(true);
      setValuesPaciente(false);
    }else{
      setValuesDoctor(false);
      setValuesFamiliar(false);
      setValuesPaciente(true);
    }
  };

  const CrearUsuario = async () =>{
    
    // Conectamos con la API para mandar los datos registrado para el nuevo usuario
    const response = await globalThis.fetch('http://10.0.2.2:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdUser:  "marialuisa@gmail.com", Password:  "Merty123"}),
        });
        const responseData = await response.json();
        console.log(responseData);
  }

  return (
    <ScrollView style={StylesSettings.mainContainer}>
      <View>
        <View style={StylesSettings.containerSVG}>
          <PresentationBox />
        </View>
        <View style={StylesSettings.Container}>
          <Text style={StylesSettings.Titlee}>Sign Up</Text>
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Nombre(s)'
            onChangeText={setNombre}
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Apellido(s)'
            onChangeText={setApellidos}
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Correo@ejemplo.com'
            onChangeText={setCorreo}
          />
          <TextInput
            style={StylesSettings.InputBox}
            placeholder='Contraseña'
            secureTextEntry={VerContra}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => { setShowCalendar(true) }}
            style={StylesSettings.InputBox}
            activeOpacity={1}
          >
            <Text
              style={{ fontSize: 20, color: '#626260' }}
            >{Fecha}</Text>
          </TouchableOpacity>
          <Modal visible={ShowCalendar} animationType='fade'>
            <Calendar
              style={{ borderRadius: 10, elevation: 5, margin: 40 }}
              onDayPress={date => {
                setFecha(date.dateString)
                setShowCalendar(false)
              }}
            />
          </Modal>
          <View style={StylesSettings.dropdown}>
            <Picker
              selectedValue={Tipo}
              onValueChange={handleTipoUsuarioChange}
              mode="dropdown"
              style={StylesSettings.PikckerStyle}
            >
              <Picker.Item label="Seleccionar tipo de usuario" value={null} />
              <Picker.Item label="Paciente" value={'Paciente'} />
              <Picker.Item label="Doctor" value={'Doctor'} />
              <Picker.Item label="Familiar" value={'Familiar'} />
            </Picker>
          </View>
          {ValuesDoctor && (
            <View style={{
              width: '100%',
              ...StylesSettings.Container
            }}>
              <TextInput
                style={StylesSettings.InputBox1}
                placeholder='Celuda'
                onChangeText={setCedula}
              />
              <TextInput
                style={StylesSettings.InputBox}
                placeholder='Especialidad'
                onChangeText={setEspecialidad}
              />
            </View>
          )}
          {ValuesFamiliar && (
            <View style={{
              width: '100%',
              ...StylesSettings.Container
            }}>
              <TextInput
                style={StylesSettings.InputBox1}
                placeholder='Número Telefónico'
                onChangeText={setCedula}
                keyboardType='numeric'
              />
            </View>
          )}
          {ValuesPaciente && (
            <View style={{
              width: '100%',
              ...StylesSettings.Container
            }}>
              <TextInput
                style={StylesSettings.InputBox1}
                placeholder='Numero Seguro Social'
                onChangeText={setCedula}
                keyboardType='numeric'
              />
            </View>
          )}
          <View style={StylesSettings.ContainerButton}>
            <TouchableOpacity >
              <LinearGradient
                colors={['#00668C', '#D4EAF7']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StylesSettings.InputButtom}
              >
                <Text style={StylesSettings.TextButton} onPress={CrearUsuario} >REGISTRARSE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={1} style={{ marginTop: 15, marginVertical:20 }} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={StylesSettings.SubText}>¿Tienes cuenta? Inicia sesión aquí.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
