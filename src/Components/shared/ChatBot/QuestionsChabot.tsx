import React, { useState } from "react"
import { Dimensions, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { ChatBotMessages } from "../../../interfaces/interfaces";
import { ChatBotMessage } from "./ChatBotMessage";


export const QuestionsChabot = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [Message, setMessage] = useState('');
    const [UserBot, setUserBot] = useState('');
    const [ListMensages, setListMensages] = useState<ChatBotMessages[]>([]);
    // Creamos la conxeion al chatbot
    const MandarMensage = async () => {
        const response = await globalThis.fetch('http://10.0.2.2:5000/predict', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: Message }),
        });
        const responseData = await response.json();
        const VMIAMessage = { name: 'VMIA', message: responseData.answer };
        const Usuario = {name: 'User', message: Message}
        ListMensages.push(Usuario);
        ListMensages.push(VMIAMessage);
        console.log(VMIAMessage);
        setRefreshing(!refreshing);
    };

    const Reset = () => {
        setListMensages([]);
        setRefreshing(!refreshing);
    };


    return (
        <View style={{ flex: 1, width: Dimensions.get('window').width * 0.9 }}>
            {refreshing ?
                <View style={{ flex: 1 }}>
                    <ChatBotMessage Lista={ListMensages} />
                </View> :
                <View style={{ flex: 1 }}>
                    <ChatBotMessage Lista={ListMensages} />
                </View>}
            <LinearGradient
                colors={['#00668C', '#D4EAF7']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ backgroundColor: 'red', height: 80, alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                    placeholder="Ingresar Texto"
                    onChangeText={setMessage}
                    style={{ marginHorizontal: 10, backgroundColor: '#FFFEFB', width: '55%', borderRadius: 10, }}
                />
                <Pressable
                    style={{ backgroundColor: '#FFFEFB', width: 60, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={MandarMensage}
                ><Text>Send</Text></Pressable>
                <Pressable
                    style={{ marginHorizontal: 10, backgroundColor: '#FFFEFB', width: 60, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={Reset}
                ><Text>ReTURN</Text></Pressable>
            </LinearGradient>
        </View>
    )
}


