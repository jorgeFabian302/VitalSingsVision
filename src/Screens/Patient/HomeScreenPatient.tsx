import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';

import { ConsultaClass, Data, DoctorInfo } from '../../interfaces/interfaces';
import HomeSCreenDataP from './HomeSCreenDataP';
import HomeScreenDataU from './HomeScreenDataU';

interface Props {
    User: Data,
}

export const HomeScreenPatient = ({ User }: Props) => {
    const [RevisionCardiaca, setRevisionCardiaca] = useState<ConsultaClass>();
    const [DataDoctor, setDataDoctor] = useState<DoctorInfo>();
    const [Estatus, setEstatus] = useState(false);
    const [EstatusD, setEstatusD] = useState(false);

    const ObtencionSignos = async () => {
        if (!Estatus){
            const response = await globalThis.fetch('http://10.0.2.2:4000/consulta/ultimasesion', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdFPaciente: User.IdUser }),
            });
            const responseData = await response.json();
            if (responseData.code === 200) {
                setEstatus(true);
                console.log('entra2' + RevisionCardiaca?.consulta.IdFDoctor);
                setRevisionCardiaca(responseData);
                console.log(responseData);
                const response = await globalThis.fetch('http://10.0.2.2:4000/doctor/02-UMaRu1905', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const responseDataDoctor = await response.json();
                if (responseDataDoctor.code === 200) {
                    console.log(responseDataDoctor)
                    setDataDoctor(responseDataDoctor);
                    setEstatusD(true);
                }
            }
        }
    }

    useEffect(() => {
        //Mandamos las peticiones 
        ObtencionSignos();
    }, [])
    

    if (!Estatus) {
        return (<HomeScreenDataU UserP={User}/>)
    }
    else {
        if (EstatusD) {
            return (<HomeSCreenDataP UserP={User} RevisionCardiaca={RevisionCardiaca} UserD={DataDoctor} />)
        }else{
            return (<View><Text>vdkvfjvhfdvjkhfv</Text></View>)
        }
    }
}


