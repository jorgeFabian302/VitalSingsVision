import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';

import { ConsultaClass, Data, Doctor } from '../../interfaces/interfaces';
import HomeSCreenDataP from './HomeSCreenDataP';
import HomeScreenDataU from './HomeScreenDataU';

interface Props {
    User: Data,
}

export const HomeScreenPatient = ({ User }: Props) => {
    const [RevisionCardiaca, setRevisionCardiaca] = useState<ConsultaClass>();
    const [DataDoctor, setDataDoctor] = useState<Doctor>();
    const [Estatus, setEstatus] = useState(false);

    const ObtencionSignos = async () => {
        if (!Estatus) {
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
                setRevisionCardiaca(responseData);
                setDataDoctor(responseData.consulta.doctor);
                setEstatus(true);
            }
        }
    }

    useEffect(() => {
        //Mandamos las peticiones 
        ObtencionSignos();
    }, [])


    if (!Estatus) {
        return (<HomeScreenDataU UserP={User} />)
    }
    else {
        return (<HomeSCreenDataP UserP={User} RevisionCardiaca={RevisionCardiaca} UserD={DataDoctor} />)
    }
}


