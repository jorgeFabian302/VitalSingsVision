import { DateData } from "react-native-calendars";

const terminal = '10.214.70.83'; // Cambiar si usas un emulador o un dispositivo físico
const Api = `http://${terminal}:4000`;

export const getNumberOfUsers = async (url: string) => {
    let retries = 3;
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(Api + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const data = await res.json();
            return data;
        } catch (error) {
            console.error(`Intento ${i + 1}: Error cargando usuarios:`, error);
            await new Promise(res => setTimeout(res, 1000)); // Espera 1 segundo antes de reintentar
        }
    }
    return null;
};
// Crear un nuevo usuario
export const createNewUser = async (
    IdUser: string, Nombre: string, Apellidos: string, Correo: string,
    Fecha: string, Password: string
) => {
    try {
        const response = await fetch(`${Api}/user/Insert`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                IdUser: IdUser,
                Nombre: Nombre.toUpperCase(), 
                Apellidos: Apellidos.toUpperCase(), 
                Correo: Correo, 
                FechaNacimiento: Fecha, 
                FotoPerfil: '', 
                Password: Password }),
          });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json(); // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error creando usuario:", error);
        return null; // O propagar error con `throw error;`
    }
};
export const createNewDoctor = async(
    idDoctor:string,Cedula:string,Especialidad:string
)=>{
    try{
        const result =  await fetch(`${Api}/Doctor/Insert`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdDoctor: idDoctor, Cedula: Cedula.toUpperCase(), Especialidad: Especialidad.toUpperCase() }),
        });
        if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
        }  
        return await result.json();
    }catch(error){
        console.error("Error creando doctor:", error);
        return null; // O propagar error con `throw error;`
    }
};
export const createNewPaciente = async(
    idDoctor:string,Cedula:string
)=>{
    try{
        const result =  await fetch(`${Api}/Paciente/Insert`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdPaciente: idDoctor, NumeroSeguroSocial:Cedula }),
        });
        if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
        }  
        return await result.json();
    }catch(error){
        console.error("Error creando paciente:", error);
        return null; // O propagar error con `throw error;`
    }
};
export const createNewFamiliar = async(
    idDoctor:string,Cedula:string
)=>{
    try{
        const result =  await fetch(`${Api}/Familiar/Insert`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdDoctor: idDoctor, NumeroTelefono: Cedula }),
        });
        if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
        }  
        return await result.json();
    }catch(error){
        console.error("Error creando familiar:", error);
        return null; // O propagar error con `throw error;`
    }
};
export const assignRols = async (
    iduser: string, 
    RolPaciente: boolean, 
    RolDoctor: boolean, 
    RolFamiliar: boolean
) => {
    try {
        const response = await fetch(`${Api}/Roles/Insert`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                IdUser: iduser, 
                RolPaciente, 
                RolDoctor, 
                RolFamiliar 
            }),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        // Convertir respuesta a JSON
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al asignar roles:", error);
        return null;
    }
};

