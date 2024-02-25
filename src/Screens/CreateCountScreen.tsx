import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'react-native-linear-gradient';

import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';





export const CreateCountScreen = () => {
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

  const handleTipoUsuarioChange = (value: string) => {
    setTipo(value);
    // Si se selecciona "Doctor", mostrar las opciones especiales.
    if (value === "Doctor") {
      setValuesDoctor(true);
    } else {
      setValuesDoctor(false);
    }
  };

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
                style={StylesSettings.InputBox}
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
          <View style={StylesSettings.ContainerButton}>
            <TouchableOpacity >
              <LinearGradient
                colors={['#00668C', '#D4EAF7']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StylesSettings.InputButtom}
              >
                <Text style={StylesSettings.TextButton} >REGISTRARSE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={1} style={{ marginTop: 15, marginVertical:20 }}>
            <Text style={StylesSettings.SubText}>¿Tienes cuenta? Inicia sesión aquí.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
