import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { LinearGradient } from 'react-native-linear-gradient';

import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';
import { RootStackParams } from '../Navigator/NavigatorControler';
import { TotalPaciente } from '../interfaces/interfaces';
import { assignRols, createNewDoctor, createNewFamiliar, createNewPaciente, createNewUser, getNumberOfUsers } from '../Components/Api';





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
  const [CountPaciente, setCountPaciente] = useState<TotalPaciente>();

  const handleTipoUsuarioChange = (value: string) => {
    setTipo(value);
    // Si se selecciona "Doctor", mostrar las opciones especiales.
    if (value === "Doctor") {
      setValuesDoctor(true);
      setValuesFamiliar(false);
      setValuesPaciente(false);
    } else if (value === 'Familiar') {
      setValuesDoctor(false);
      setValuesFamiliar(true);
      setValuesPaciente(false);
    } else if (value === 'Paciente') {
      setValuesDoctor(false);
      setValuesFamiliar(false);
      setValuesPaciente(true);
    }
    else {
      setValuesDoctor(false);
      setValuesFamiliar(false);
      setValuesPaciente(false);
    }
  };

  const CrearUsuario = async () => {
    let usuarioSelecccionado = ValuesPaciente || ValuesFamiliar || ValuesDoctor;
    if (!usuarioSelecccionado) {
      Alert.alert("Falta de información", "No se selecciono un tipo de usuario");
      return;
    }
    //Evaluamos que fueron escrito todos los datos necesarios
    if (Nombre === "" || Apellidos === "" || Password === "" || Correo === "" || Cedula === "") {
      Alert.alert("Falta de información", "No se llenaron todos los campos");
      return;
    }
    let responsetemp =  await getNumberOfUsers('/user/count');
    //Checamos que si se aya regresado una respuesta
    if (responsetemp === null) {
      let responsetemp =  await getNumberOfUsers('/user/count');
    }
    if(responsetemp === null){
      Alert.alert("sevidores no contactados","no se tiene respuesta de los servidores");
      return;
    }
    setCountPaciente(responsetemp);
    const FechaNacimiento = new Date(Fecha);
    const MesNacimiento = FechaNacimiento.getMonth()+1;
    const DiaNacimiento = FechaNacimiento.getDate()+1;
    //Cremamos la llave correpondiente para la creacion del usuario
    if (CountPaciente != null) {
      if (CountPaciente.total <= 9) {
        setIdUser("0" + String(CountPaciente?.total) + "-U" + Nombre[0].toUpperCase() + Nombre[1] + Apellidos[0].toUpperCase() + Apellidos[1] + String(DiaNacimiento) + String(MesNacimiento));
      } else {
        setIdUser(String(CountPaciente?.total) + "-U" + Nombre[0].toUpperCase() + Nombre[1] + Apellidos[0].toUpperCase() + Apellidos[1] + String(DiaNacimiento) + String(MesNacimiento));
      }
      //Mandamos a llamar a la respectiva API para hacer la inserccion de lso datos dentro de la tabla User
      const responseData =  await createNewUser(IdUser,Nombre,Apellidos,Correo,Fecha,Password);
      let responseData2 = undefined;
      if (ValuesDoctor) {
        responseData2 = await  createNewDoctor(IdUser,Cedula,Especialidad);
      }
      else if (ValuesPaciente) {
        responseData2 = await  createNewPaciente(IdUser,Cedula);
      }
      else {
        responseData2 = await  createNewFamiliar(IdUser,Cedula);
      }
      const responseData3 = await assignRols(IdUser,ValuesPaciente,ValuesDoctor,ValuesFamiliar);

      if (responseData2.code === 201 && responseData3.code === 201) {
        Alert.alert("Creación de usuario nuevo", responseData2.message);
        navigation.navigate('LoginScreen');
      }
    }
  }

  return (
    <ScrollView style={StylesSettings.mainContainer}>
      <View>
        <View style={StylesSettings.containerSVG}>
          <PresentationBox PositionsR={'relative'}/>
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
              onDayPress={(date: DateData) => {
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
          <TouchableOpacity activeOpacity={1} style={{ marginTop: 15, marginVertical: 20 }} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={StylesSettings.SubText}>¿Tienes cuenta? Inicia sesión aquí.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
