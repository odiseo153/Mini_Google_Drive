import React, { useState } from 'react';
import { CrearArchivo, CrearDirectorio } from '../Api';



export default function AddFiles({ ruta,setNewDir,setArchivoNuevo }: { ruta: string,setNewDir:(info:string)=>void,setArchivoNuevo:(info:string)=>void}) {
  const [CrearAlgo, setCrearAlgo] = useState<boolean>(true);
  const [nombreDirectorio, setNombreDirectorio] = useState<string>('');
  const [archivoSubido, setArchivoSubido] = useState<boolean | null>(false);
  const [archivo, setArchivo] = useState<File>();


  const handleNombreDirectorioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombreDirectorio(event.target.value);
  };

  const handleArchivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setArchivoSubido(true);
      setArchivo(files[0]);
    }
  };



  const handleCrearArchivoClick = () => {
   CrearArchivo(ruta, archivo);
    setArchivoSubido(false);
    setArchivo(undefined);
    setArchivoNuevo(archivo?.name || "")
  };

  const handleCrearDirectorioClick = () => {
    CrearDirectorio(ruta, nombreDirectorio);
    setNombreDirectorio("");
    setNewDir(nombreDirectorio)
  };


  

  return (
    <div className="" id="addFilesModal"  >
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-3xl" id="addFilesModalLabel">Crear</h5>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row ">
              <label className="radio mr-1">
                <input
                  type="radio"
                  name="add"
                  defaultChecked
                  onClick={() => {
                    setCrearAlgo(true);
                    setNombreDirectorio("");
                  }}
                />
                <span>
                  <i className="fa fa-file"></i> Archivo
                </span>
              </label>


              <label className="radio">
                <input
                  type="radio"
                  name="add"
                  value="add"
                  onClick={() => {
                    setCrearAlgo(false);
                    setArchivoSubido(false);
                  }}
                />
                <span>
                <i className="fa-solid fa-folder"></i> Directorio
                </span>
              </label>


            </div>

            <div className="form-group">
              {!CrearAlgo && <input className="form-control" type="text" placeholder="Nombre" onChange={handleNombreDirectorioChange} />}

              {CrearAlgo && <input className="form-control"  type="file" placeholder="Nombre Del Directorio" onChange={handleArchivoChange} />}
            </div>

            {CrearAlgo && (
              <button className="btn btn-primary btn-block confirm-button m-2" onClick={handleCrearArchivoClick} disabled={!archivoSubido}>
                Crear Archivo
              </button>
            )}

            {!CrearAlgo && (
              <button className="btn btn-primary btn-block confirm-button m-2" onClick={handleCrearDirectorioClick} disabled={!nombreDirectorio}>
                Crear Directorio
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
