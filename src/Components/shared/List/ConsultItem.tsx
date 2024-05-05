import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Consulta, Data } from '../../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../Navigator/NavigatorControler';

interface Props {
    consulta: Consulta,
    User:Data
}


export const ConsultItem = ({ consulta, User }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [ColorEstatus, setColorEstatus] = useState<string>();
    const [Fecha, setFecha] = useState("");
    useEffect(() => {
        if (consulta.Estado === 'Estable') {
            setColorEstatus('#6ADEAC');
        }
        else if (consulta.Estado === 'Regular') {
            setColorEstatus('#F79B59');
        } else {
            setColorEstatus('#FB3D61');
        }
    })
    useEffect(() => {
        const fechaFormateada = moment(consulta.FechaConsulta, 'ddd, DD MMM YYYY HH:mm:ss z').format('DD/MM/YYYY');
        setFecha(fechaFormateada);
    })
    return (
        <TouchableOpacity style={StylesSheetitems.ContainerTouchableOpacity} onPress={() => navigation.navigate('DiagnosisScreen', { RevisionCardiaca: consulta, UserDpr: User})}>
            <View style={StylesSheetitems.Container}>
                <Text style={ StylesSheetitems.text }>Fecha Consulta: {Fecha}</Text>
            </View>
            <View style={{ ...StylesSheetitems.ColorEstaus, backgroundColor: ColorEstatus }} />
        </TouchableOpacity>
    )
}

export const StylesSheetitems = StyleSheet.create({
    ContainerTouchableOpacity: {
        backgroundColor: '#F5F4F1',
        borderRadius: 5,
        alignItems: 'stretch',
        flexDirection: 'row',
        marginTop: 5,
        height: 50,
        width: 360,
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 25,
    },
    ColorEstaus: {
        width: 20,
        height: '100%',
        borderRadius: 5,
    },
    text: {
        fontSize: 15,
    },
})