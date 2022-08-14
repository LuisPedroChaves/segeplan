
export interface Procesos {
    noFormaCapital: Process[],
    formaCapital: Process[],
}


export interface Process {
    PROCESO: number,
    DESCRIPCION: string,
    TIPO_PROYECTO: string,
}