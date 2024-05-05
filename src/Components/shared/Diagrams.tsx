import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ECG } from './GraphisSmall';
import { RevisionCardiaca, Consulta } from '../../interfaces/interfaces';
import moment from 'moment';

interface Props{
  Consultas?: Consulta
}

export const Diagrams = ({ Consultas}: Props) => {
  const [colorStatus, setcolorStatus] = useState('#6ADEAC');
  const [Fecha, setFecha] = useState("");

  useEffect(() => {
    const fechaFormateada = moment(Consultas?.FechaConsulta, 'ddd, DD MMM YYYY HH:mm:ss z').format('DD/MM/YYYY');
    setFecha(fechaFormateada);
  })
  
  return (
    <TouchableOpacity style={StylesDiagrmas.Container}>
      <View style={{ ...StylesDiagrmas.BarraStatus, backgroundColor: colorStatus }} />
      <View style={{ height: Dimensions.get('screen').height * 0.30, flex: 1 }}>
        <View>
          <Text style={{ fontSize: 17, marginLeft: 6 }}>Corazón:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, marginLeft: 6 }} >{Consultas?.FrecuenciaCardiaca}</Text>
            <Text style={{ marginLeft: 2, marginTop: 6 }}>rpm</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 50, flex: 1 }}>
          <Text style={{ fontSize: 15 }}>Last</Text>
          <Text style={{ fontSize: 15 }}>Appointment:</Text>
          <View style={{ marginTop: 3, alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>{Fecha}</Text>
            <Text style={{ fontSize: 12 }}>{Consultas?.HoraConsulta}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 2.6}}>
        <Text style={{ fontSize: 25, }}>Estatus: {Consultas?.Estado}</Text>
        <View style={{ width: 262}}>
            <ECG SignalData={Consultas?.revisionCardiaca} Errorx={25} Errory={83}/>
        </View>
        {/*<ECG SignalData={Consultas?.revisionCardiaca}/>*/}
        {/*<View style={{flex:1, alignItems:'center'}}>
          {/* mostrar la grafica del elector cardiograma  }
          <Image  source={require('../../Image/Di.png')}/>
        </View>*/}
      </View>
    </TouchableOpacity>
  )
}

export const StylesDiagrmas = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    marginVertical: 20,
    height: Dimensions.get('screen').height * 0.31,
    width: Dimensions.get('screen').width * 0.95,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  BarraStatus: {
    width: 10,
    height: Dimensions.get('screen').height * 0.31,
  }
})