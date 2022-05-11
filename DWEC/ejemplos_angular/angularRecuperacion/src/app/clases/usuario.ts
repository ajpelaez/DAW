export class Usuario {
    nombre?: string
    apellido?: string
    edad?: number

    constructor (nombre_ent?:string, apellido_ent?:string){
        this.nombre = nombre_ent
        this.apellido = apellido_ent
    }
}