import { useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { StylesSettings } from '../Styles/StylesSettings'
import { PresentationBox } from '../Components/PresentationBox'
import { Data } from '../interfaces/interfaces'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParams } from '../Navigator/NavigatorControler'
import { ChatBotScreen } from '../Components/shared/ChatBot/ChatBotScreen'
import { ButtonChatbot } from '../Components'
import { StylesHomeInfoUser } from '../Styles/StylesHomeInfoUser'
import Icon from 'react-native-vector-icons/Ionicons';

export const InfoUserSCreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const params = useRoute<RouteProp<RootStackParams, 'InfoUserSCreen'>>().params;
    if(params.User != undefined){
        //Obtenemos el ID del Usuario a consultar
        const [User, setUser] = useState<Data>(params.User);
        const [ChatVisible, setChatVisible] = useState(false);

        return (
            <View style={StylesSettings.mainContainer}>
                <View style={StylesSettings.containerSVG}>
                    <PresentationBox PositionsR={'absolute'} />
                    <Image source={require('../Image/User.png')} style={StylesHomeInfoUser.UserContainer} resizeMode='contain' />
                </View>
                <View style={StylesHomeInfoUser.ContainerLabes}>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <View style={StylesHomeInfoUser.ContainerLabelText}><Text style={StylesHomeInfoUser.TextLabel}>{User.Nombre}</Text></View>
                        {/*<TouchableOpacity style={StylesHomeInfoUser.ContainerLabelicon}><Text><Icon name="pencil-sharp" size={30} color="#A3A2A0" /></Text></TouchableOpacity>*/}
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <View style={StylesHomeInfoUser.ContainerLabelText}><Text style={StylesHomeInfoUser.TextLabel}>{User.Apellidos}</Text></View>
                        {/*<TouchableOpacity style={StylesHomeInfoUser.ContainerLabelicon}><Text><Icon name="pencil-sharp" size={30} color="#A3A2A0" /></Text></TouchableOpacity>*/}
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <View style={StylesHomeInfoUser.ContainerLabelText}><Text style={StylesHomeInfoUser.TextLabel}>{User.Correo}</Text></View>
                        {/*<TouchableOpacity style={StylesHomeInfoUser.ContainerLabelicon}><Text><Icon name="pencil-sharp" size={30} color="#A3A2A0" /></Text></TouchableOpacity>*/}
                    </View>
                    <View style={StylesHomeInfoUser.ContainerLabel}>
                        <View style={StylesHomeInfoUser.ContainerLabelText}><Text style={StylesHomeInfoUser.TextLabel}>{User.FechaNacimiento}</Text></View>
                        {/*<TouchableOpacity style={StylesHomeInfoUser.ContainerLabelicon}><Text><Icon name="pencil-sharp" size={30} color="#A3A2A0" /></Text></TouchableOpacity>*/}
                    </View>
                </View>
                {ChatVisible && (<View style={{
                    position: 'absolute',
                    width: Dimensions.get('screen').width * 0.9,
                    height: Dimensions.get('screen').height * 0.75,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    marginHorizontal: 20
                }}>
                    <ChatBotScreen />
                </View>)}
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginEnd: 10 }}>
                    <ButtonChatbot onPress={() => setChatVisible(!ChatVisible)} />
                </View>
            </View>
        )
    }
}
