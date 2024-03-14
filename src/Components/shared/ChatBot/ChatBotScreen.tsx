import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native'
import { ChatBotOptions } from './ChatBotOptions';
import { QuestionsChabot } from './QuestionsChabot';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
    isVisbleCheckParient?: boolean
}

export const ChatBotScreen = ({ isVisbleCheckParient = false }: Props) => {
    const [Header, setHeader] = useState('Bienvenido a VMIA')
    return (
        <View>
            <View>
                <LinearGradient
                    colors={['#00668C', '#D4EAF7']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ height: 40, alignItems:'center', justifyContent:'center' }}
                >
                    <Text  style={{ color:'white', fontSize: 20 }}>{Header}</Text>
                </LinearGradient>
            </View>
            {isVisbleCheckParient ? <ChatBotOptions /> : <QuestionsChabot />}
        </View>
    )
}
