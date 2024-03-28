import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { ChatBotMessages } from '../../../interfaces/interfaces';
import { MensageITem } from './MensageITem';

interface Props {
    Lista: ChatBotMessages[],
}

export const ChatBotMessage = ({ Lista }: Props) => {
    return (
        <View>
            <FlatList
                data={Lista}
                renderItem={({ item }) => <MensageITem message={item} />}
            />
        </View>
    )
}
