import React, { useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { ChatBotScreen } from '../../Components/shared/ChatBot/ChatBotScreen';
import { ButtonChatbot } from '../../Components';

interface Props {
  User: any,
  Doctor: any
}

export const HomeScreenDoctor = ({ User, Doctor }: Props) => {
  const [ChatVisible, setChatVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'green' }}></View>
        <View style={{ flex: 1, backgroundColor: 'red' }}></View>
        <View style={{ flex: 1, backgroundColor: 'black' }}></View>
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
