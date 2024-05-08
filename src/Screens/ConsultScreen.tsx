import { Alert, Button, Image, Modal, PermissionsAndroid, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StylesSettings } from '../Styles/StylesSettings'
import { PresentationBox } from '../Components/PresentationBox'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../Navigator/NavigatorControler';
import { useEffect, useState } from 'react';
import { openSettings } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { StylesHomeSettings } from '../Styles/StylesHomeSettings';
import { Data, Paciente } from '../interfaces/interfaces';
import { ImagePickerResponse, MediaType, launchImageLibrary } from 'react-native-image-picker';
import { StylesHomeInfoUser } from '../Styles/StylesHomeInfoUser';


export const ConsultScreen = () => {
    const params = useRoute<RouteProp<RootStackParams, 'ConsultScreen'>>().params;
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [UserP, setUserP] = useState<Paciente>(params.UserP);
    const [USerD, setUSerD] = useState<Data>(params.UserD);
    const [DateConsult, setDateConsult] = useState<string>();
    const [HoraConsult, setHoraConsult] = useState<string>();
    const [countconsult, setcountconsult] = useState(0);
    const [countrevicionca, setcountrevicionca] = useState(0);
    const [idConsult, setidConsult] = useState<string>();
    const [Estado, setEstado] = useState<string>();
    const [Frecuenciacardiaca, setFrecuenciacardiaca] = useState(0.0);
    const [idRevisioncardiaca, setidRevisioncardiaca] = useState<string>();
    const [selectedImage, setSelectedImage] = useState<ImagePickerResponse | null>(null);
    const [Estatus, setEstatus] = useState(false);


    const ObtencionDatos = async () => {
        if(!Estatus){
            const responsetemp = await globalThis.fetch('http://10.0.2.2:4000/consult/count', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const responsetemp2 = await globalThis.fetch('http://10.0.2.2:4000/revisionca/count', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const responsecountuser = await responsetemp.json();
            const responsecountuser2 = await responsetemp2.json();
            if (responsecountuser.code == 200 && responsecountuser2.code == 200) {
                setcountconsult(responsecountuser.total);
                setcountrevicionca(responsecountuser2.total);
                setEstatus(true);
            }
        }
    }

    const obtenerimgECG = async () => {
        // Verificamos que los permisos para acceder a la camara y a los archivos del telefono este habilitados
        // de no ser asi los pediremos, en el caso de que el usuario los niegue se mandara a la pantalla de confirguracion para 
        // que los de manualmente si esto no se encutran habilitados no podra seleccionar la imagen correspondiente al ECG
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Permiso de cámara',
                    message: 'Esta aplicación necesita acceder a tu cámara para funcionar correctamente.',
                    buttonPositive: 'Aceptar',
                    buttonNegative: 'Cancelar',
                }
            );
            const result2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: 'Permiso de almacenamiento',
                    message: 'Esta aplicación necesita acceder a tus archivos para funcionar correctamente.',
                    buttonPositive: 'Aceptar',
                    buttonNegative: 'Cancelar',
                }
            );
            if (result2 !== PermissionsAndroid.RESULTS.GRANTED && result !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permiso denegado', 'La aplicación no podrá acceder a tu cámara');
                Alert.alert('Permiso denegado', 'La aplicación no podrá acceder a tus archivos.');
                openSettings();
            } else {
                const options = {
                    mediaType: 'photo' as MediaType,
                };
                // Mostrar el selector de imágenes
                launchImageLibrary(options, (response: ImagePickerResponse) => {
                    if (response.didCancel) {
                        console.log('Selección de imagen cancelada');
                    } else if (response.assets && response.assets.length > 0) {
                        // Actualizar el estado con la imagen seleccionada
                        setSelectedImage(response);
                    }
                });
            }
        }
    }

    const SubirimgECG = async () => {
        if (selectedImage != null && selectedImage.assets != undefined) {
            try {
                // Creamos un objeto FormData para enviar la imagen
                const formData = new FormData();
                formData.append('image', {
                    uri: selectedImage.assets[0].uri,
                    type: selectedImage.assets[0].type,
                    name: selectedImage.assets[0].fileName,
                });
                // Agregamos el nuevo nombre de la imagen al FormData
                formData.append('new_filename', idRevisioncardiaca);
                formData.append('IdPaciente', UserP.IdPaciente);
                formData.append('IdRevisionCa', idRevisioncardiaca);

                // Hacemos la solicitud HTTP
                const response = await globalThis.fetch('http://10.0.2.2:4000/consulta/insertimg', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const responseData = await response.json();
                if (responseData.code == 201) {
                    Alert.alert('Success', 'la imagen se subio exitosamente al servidor');
                }

            } catch (error) {
                console.log('Error:', error);
            }
        }
    }

    const SeleccionIMG = async () => {
        obtenerimgECG();
        setTimeout(() => {
            console.log('Datos enviados');
          }, 7000);
        SubirimgECG();
    }
    const crearConsulta = async () => {
        const formData = new FormData();
        formData.append('IdPaciente', UserP.IdPaciente);
        formData.append('IdRevisionCa', idRevisioncardiaca);
        formData.append('DirectoryECG', "static" + String.fromCharCode(92)  + "images" + String.fromCharCode(92) + UserP.IdPaciente + String.fromCharCode(92) + 'Consults' + String.fromCharCode(92) + idRevisioncardiaca)
        if (selectedImage == null) {
            Alert.alert('Error', 'no se ha seleccionado niguna imagen');
            return 0;
        }

        //hacemos la solicitud http para mandar a la api creada los datos necesarios para que crear una revision cardiaca así pueda revisar
        //la imagen anteriormente cargada
        const response = await globalThis.fetch('http://10.0.2.2:4000/revisioncardiaca/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
        const responseData = await response.json();
        if (responseData.code === 201) {
            //Hacemos la solicitus Http para crear en la DB el registro de la consulta hecha al paciente
            const response = await globalThis.fetch('http://10.0.2.2:4000/consulta/insert', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdConsulta: idConsult, FechaConsulta: DateConsult, HoraConsulta: HoraConsult, IdFDoctor: USerD.IdUser, IdFPaciente: UserP.IdPaciente, IdFRevisionCa: idRevisioncardiaca, Estado: Estado, FrecuenciaCardiaca: Frecuenciacardiaca }),
            });
            const responseData = await response.json();
        } else {
            Alert.alert('warning', 'something went wrong: insert RevisionCardiaca');
        }
    }

    useEffect(() => {
        if (countconsult != 0 && countrevicionca != 0) {
            const currentDate = new Date();
            
            setDateConsult(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDay());
            setHoraConsult(currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds());
            if (countconsult <= 0) {
                setidConsult("0" + countconsult + '-' + currentDate.getFullYear() + currentDate.getDay() + UserP.IdPaciente[3] + UserP.IdPaciente[4] + USerD.IdUser[3] + USerD.IdUser[4]);
            } else {
                setidConsult(countconsult + '-' + currentDate.getFullYear() + currentDate.getDay() + UserP.IdPaciente[3] + UserP.IdPaciente[4] + USerD.IdUser[3] + USerD.IdUser[4]);
            }
            if (countrevicionca <= 9) {
                setidRevisioncardiaca("0" + countrevicionca + '-' + currentDate.getDate() + currentDate.getFullYear() + UserP.IdPaciente[3] + UserP.IdPaciente[4] + UserP.IdPaciente[5]);
            } else {
                setidRevisioncardiaca(countrevicionca + '-' + currentDate.getDay() + currentDate.getFullYear() + UserP.IdPaciente[3] + UserP.IdPaciente[4] + UserP.IdPaciente[5]);
            }
            setEstado('Estable');
            setFrecuenciacardiaca(80.0);
        }
    }, [countconsult, countrevicionca])

    useEffect(() => {
        ObtencionDatos()
    })


    return (
        <ScrollView style={StylesSettings.mainContainer}>
            <View>
                <View style={StylesSettings.containerSVG}>
                    <PresentationBox PositionsR={'relative'} />
                </View>
                <View style={StylesSettings.Container}>
                    <Text style={{ ...StylesSettings.Titlee, fontSize: 37 }}>Medical Consultatione</Text>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>ID Consult: {idConsult}</Text>
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>Date Consult: {DateConsult}</Text>
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>Parient's Name: {UserP.data.Nombre}</Text>
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>Parient's Last Name: {UserP.data.Apellidos}</Text>
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>Doctor's name: {USerD.Nombre}</Text>
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <Text style={StylesHomeInfoUser.TextLabel}>Doctor's Last name: {UserP.data.Apellidos}</Text>
                    </View>
                    <View style={{ width: 200, height: 200 }}>
                        {/* Mostramos la imagen seleccionada */}
                        {selectedImage && selectedImage.assets && selectedImage.assets.length > 0 && (
                            <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: 200, height: 200 }} />
                        )}
                    </View>
                    <TouchableOpacity onPress={SeleccionIMG} style={{ ...StylesHomeSettings.ButtomGeneral, backgroundColor: '#9B9A97' }}>
                        <Text style={{ fontSize: 20, color: '#FFFEFB' }}>Select Image</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={crearConsulta}>
                            <LinearGradient
                                colors={['#00668C', '#D4EAF7']}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={StylesHomeSettings.ButtomGeneral}
                            >
                                <Text style={{ fontSize: 20, color: '#FFFEFB' }}>Create Consult</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LinearGradient
                                colors={['#00668C', '#D4EAF7']}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={StylesHomeSettings.ButtomGeneral}
                            >
                                <Text style={{ fontSize: 20, color: '#FFFEFB' }}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
