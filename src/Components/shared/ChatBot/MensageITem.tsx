import { Text, View } from 'react-native';
import {ChatBotMessages} from '../../../interfaces/interfaces';

interface Props{
    message: ChatBotMessages
}

export const MensageITem = ( {message} : Props) => {
  return (
    <View style={{
        backgroundColor: message.name == 'VMIA' ? '#D4EAF7' : '#00668C' , 
        width:'50%',
        height: 'auto', 
        marginVertical: 20,
        alignItems: message.name == 'VMIA' ? 'flex-start' : 'flex-end',
        justifyContent:'center',
        alignSelf: message.name == 'VMIA' ? 'flex-start' : 'flex-end',
        borderRadius:20,
        }}>
        <Text style={{ 
            fontSize:20, 
            color: message.name == 'VMIA' ? '#ADACAA' : '#ffffff',
            marginHorizontal:10 }}>{message.message}</Text>
    </View>
  )
}
