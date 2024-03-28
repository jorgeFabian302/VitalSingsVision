import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'react-native-linear-gradient';

import { StylesSettings } from '../Styles/StylesSettings';
import { PresentationBox } from '../Components/PresentationBox';
import { RootStackParams } from '../Navigator/NavigatorControler';
import { TotalPaciente } from '../interfaces/interfaces';





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
    if (ValuesPaciente || ValuesFamiliar || ValuesDoctor) {
      //Evaluamos que fueron escrito todos los dotos necesarios
      if (Nombre != "" && Apellidos != "" && Password != "" && Correo != "" && Cedula != "") {
        const responsetemp = await globalThis.fetch('http://10.0.2.2:4000/user/count', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const responsecountuser = await responsetemp.json();
        console.log(responsecountuser);
        if (responsecountuser != undefined) {
          setCountPaciente(responsecountuser);
          const FechaNacimiento = new Date(Fecha);
          const MesNacimiento = FechaNacimiento.getMonth();
          const DiaNacimiento = FechaNacimiento.getDate();
          //Cremamos la llave correpondiente para la creacion del usuario
          if (CountPaciente != undefined) {
            if (CountPaciente.total <= 9) {
              setIdUser("0" + String(CountPaciente?.total) + "-U" + Nombre[0].toUpperCase() + Nombre[1] + Apellidos[0].toUpperCase() + Apellidos[1] + String(DiaNacimiento) + String(MesNacimiento));
            } else {
              setIdUser(String(CountPaciente?.total) + "-U" + Nombre[0].toUpperCase() + Nombre[1] + Apellidos[0].toUpperCase() + Apellidos[1] + String(DiaNacimiento) + String(MesNacimiento));
            }
            //Mandamos a llamar a la respectiva API para hacer la inserccion de lso datos dentro de la tabla User
            const response = await globalThis.fetch('http://10.0.2.2:4000/user/Insert', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ IdUser: IdUser, Nombre: Nombre.toUpperCase(), Apellidos: Apellidos.toUpperCase(), Correo: Correo, FechaNacimiento: Fecha, FotoPerfil: '', Password: Password }),
            });
            const responseData = await response.json();
            let responseData2 = undefined;
            if (ValuesDoctor) {
              const response2 = await globalThis.fetch('http://10.0.2.2:4000/Doctor/Insert', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdDoctor: IdUser, Cedula: Cedula.toUpperCase(), Especialidad: Especialidad.toUpperCase() }),
              });
              responseData2 = await response2.json();
            }
            else if (ValuesPaciente) {
              const response2 = await globalThis.fetch('http://10.0.2.2:4000/Paciente/Insert', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdPaciente: IdUser, NumeroSeguroSocial: Cedula }),
              });
              responseData2 = await response2.json();
            }
            else {
              const response2 = await globalThis.fetch('http://10.0.2.2:4000/Familiar/Insert', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdFamiliar: IdUser, NumeroTelefono: Cedula }),
              });
              responseData2 = await response2.json();
            }
            const response3 = await globalThis.fetch('http://10.0.2.2:4000/Roles/Insert', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ IdUser: IdUser, RolPaciente: ValuesPaciente, RolDoctor:ValuesDoctor, RolFamiliar:ValuesFamiliar }),
            });
            const responseData3 = await response3.json();
            if (responseData2.code === 201 && responseData3.code === 201) {
              Alert.alert("Creación de usuario nuevo", responseData2.message);
              navigation.navigate('LoginScreen');
            }
          }
        }
      }
      else {
        Alert.alert("Falta de información", "No se llenaron todos los campos");
      }
    }
    else {
      Alert.alert("Falta de información", "No se selecciono un tipo de usuario");
    }
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
