export interface Login {
    code: number;
    data: Data;
    error: null;
    message: string;
    status: string;
}

export interface Data {
    Apellidos: string;
    Correo: string;
    FechaNacimiento: string;
    FotoPerfil?: string;
    IdUser: string;
    Nombre: string;
}

export interface Roles {
    code: number;
    error: null;
    message: string;
    roles: RolesClass;
    status: string;
}

export interface RolesClass {
    IdUser: string;
    RolDoctor: boolean;
    RolFamiliar: boolean;
    RolPaciente: boolean;
    data: Data;
}

export interface ChatBotMessages {
    name: string;
    message: string;
}

export interface TotalPaciente {
    total: number;
}

export interface RevisionCardiacaU {
    code: number;
    error: null;
    message: string;
    revisioncardiaca: RevisionCardiaca;
    status: string;
}

export interface ConsultaClass {
    code: number;
    consulta: Consulta;
    error: null;
    message: string;
    status: string;
}

export interface Consulta {
    Estado: string;
    FechaConsulta: string;
    FrecuenciaCardiaca: number;
    HoraConsulta: string;
    IdConsulta: string;
    IdFDoctor: string;
    IdFPaciente: string;
    IdFRevisionCa: string;
    doctor: Doctor;
    paciente: Paciente;
    revisionCardiaca: RevisionCardiaca;
}

export interface Doctor {
    Cedula: string;
    Especialidad: string;
    IdDoctor: string;
    data: Data;
}


export interface Paciente {
    IdPaciente: string;
    NumeroSeguroSocial: string;
    data: Data;
}

export interface RevisionCardiaca {
    IdRevisionCa: string;
    PSignalX: number;
    PSignalY: number;
    PrimerPuntoX: number;
    PrimerPuntoY: number;
    PuntoFinalX: number;
    PuntoFinalY: number;
    PuntoMasAltoX: number;
    PuntoMasAltoY: number;
    QSignalX: number;
    QSignalY: number;
    SSignalX: number;
    SSignalY: number;
    TSignalX: number;
    TSignalY: number;
    imgFrecuencia: string;
}

export interface DoctorInfo {
    code: number;
    doctor: Doctor;
    error: null;
    message: string;
    status: string;
}

export interface ListPatient {
    code: number;
    error: null;
    listpatient: listpatient;
    message: string;
    status: string;
}

export interface listpatient {
    pacientes: Paciente[];
    total: number;
}


export interface Listconsults {
    code:         number;
    error:        null;
    listconsults: ListconsultsClass;
    message:      string;
    status:       string;
}

export interface ListconsultsClass {
    consultas: Consulta[];
    total:     number;
}