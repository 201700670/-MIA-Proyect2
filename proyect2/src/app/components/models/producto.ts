export interface Producto{
    //this.nombre, this.precio, this.urlfoto, this.descripcion, 1, palabra, this.categoria
    id?:number,
    nombre?:string,
    precio?:number,
    foto?:string,
    detalle_producto?:string,
    estado?:number,
    palabras_clave?:string,
    categoria?:string,
    cantidad?:string
}