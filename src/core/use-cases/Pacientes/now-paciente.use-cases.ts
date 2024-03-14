//manda a llamar las funciones para trarse los datos de los pacientes

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";

export const NowPacientesUseCase = async (fetcher: HttpAdapter) =>{
    try{

        const NowPaciente = await fetcher.get('/Patient/Select');

        console.log({NowPaciente})
        return [];

    }catch(error){

    }
}