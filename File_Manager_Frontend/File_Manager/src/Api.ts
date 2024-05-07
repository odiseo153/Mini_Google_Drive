import { mensajeEmergente } from "./MensajeEmergente";
import { DatosUnidad } from "./interface";



export const GetDatos = async (ruta:string | undefined): Promise<DatosUnidad> => {
    try {
        const response = await fetch("https://localhost:7281/Data?path="+"//"+ruta);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const CrearDirectorio = (ruta:string,nombreDirectorio: string) => {
    
     
    fetch(`https://localhost:7281/Folders?path=${ruta}&directorio=${nombreDirectorio}`,{
        method:'POST'
    })
        .then(res => res.json())
        .then(res => {
            mensajeEmergente(res.message);
        })
        .catch(err => console.log(err))

//https://localhost:7281/File?path=%5C%5C&nombreArchivo=fondo.jpg
}

export const BorrarDirectorio = (ruta:string,nombreDir:string) => {

    fetch(`https://localhost:7281/Folders?path=${ruta}&directorio=${nombreDir}`,{
        method:'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            mensajeEmergente(res.message)
        })
        .catch(err => console.log(err))
    
    
}

export const BorrarArchivo = (ruta:string,nombreArchivo:string) => {

    fetch(`https://localhost:7281/File?path=${ruta}&nombreArchivo=${nombreArchivo}`,{
        method:'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            mensajeEmergente(res.message)
        })
        .catch(err => console.log(err))

}

export const CrearArchivo = (ruta:string,Archivo) => {
    const form = new FormData();
    form.append('archivo' , Archivo);


    fetch(`https://localhost:7281/Files?path=${ruta}`,{
        method:'POST',
        body: form
    })
        .then(res => res.json())
        .then(res => {
            mensajeEmergente(res.message)
        })
        .catch(err => console.log(err))
    
    
}



