import { useEffect, useState } from 'react';
import { BorrarArchivo, BorrarDirectorio, GetDatos } from '../Api';
import AddFiles from './AddFiles';
import { DirectoryItem } from './Items/DirectoryItem';
import { FileItem } from './Items/FileItem';
import { DatosUnidad } from '../interface';

export default function Files() {
  const [ruta, setRuta] = useState<string>("\\");
  const [filtro, setFiltro] = useState<string>("");
  const [busquedaDir, setBusqueda] = useState<string>("");
  const [imagen, setImagen] = useState<string>("");
  const [imagenAbierta, setImagenAbierta] = useState<boolean>(false);

  const [Datos, setDatos] = useState<DatosUnidad>({
    archivos: [''],
    directorios: ['']
  });

  const setArchivoNuevo = (newFile: string) => {
    setDatos({
      archivos: [...Datos.archivos, newFile],
      directorios: Datos.directorios
    })
  }

  const setDirNuevo = (newDir: string) => {
    setDatos({
      archivos: Datos.archivos,
      directorios: [...Datos.directorios, newDir]
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Data = await GetDatos(ruta);
        setDatos(Data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ruta, filtro, busquedaDir]);

  const cambioRuta = (nueva: string) => {
    const nuevaRuta = ruta + "\\" + nueva;
    setRuta(nuevaRuta)
  }

  const DatosFiltrados = (): DatosUnidad => {
    let Data = Datos;

    if (filtro === "file") {
      Data = Datos;
      Data.directorios = []

    }
    if (filtro === "dir") {
      Data = Datos;
      Data.archivos = []
    }
    if (filtro === "") {
      Data = Datos;
    }
    if (busquedaDir !== "") {
      Data = Datos;
      Data.directorios = Datos.directorios.filter(x => x.toLowerCase().includes(busquedaDir.toLowerCase()))
    }

    return Data;
  }

  const BorrarDir = (nombreDir: string) => {
    BorrarDirectorio(ruta, nombreDir)
    const removeDir = Datos.directorios.filter(x => x !== nombreDir);
    setDatos({
      archivos: Datos.archivos,
      directorios: removeDir
    })
  }

  const BorrarFile = (FileName: string) => {
    BorrarArchivo(ruta, FileName)
    const removeFile = Datos.archivos.filter(x => x !== FileName);
    setDatos({
      archivos: removeFile,
      directorios: Datos.directorios
    });
  }

  const RetrosesoRuta = () => {
    const rutaActual = ruta.split("\\");
    if (rutaActual.length > 1) {
      const nuevaRuta = rutaActual.slice(0, -1).join("\\");
      setRuta(nuevaRuta);
    }
  };

  const abrirFoto = async (nombreFile: string) => {
    const rutaActual = ruta + "\\" + nombreFile;
    fetch(`https://localhost:7281/AbrirArchivo?path=${rutaActual}`)
      .then(response => response.blob())
      .then(blob => {
        const result = URL.createObjectURL(blob);
        setImagen(result)

        setImagenAbierta(!imagenAbierta)
      });
  };


  return (
    <div>
    <div className="container mx-auto">
      <div className="lg:flex lg:justify-between lg:flex-wrap lg:items-center pt-3 pb-2 mb-3 border-b border-gray-300">
        <h1 className="text-2xl lg:text-3xl font-bold">Mi Unidad</h1>
  
        <div className="group flex items-center">
          <svg className="w-6 h-6 fill-current text-gray-500 group-hover:text-gray-600 mr-2" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input placeholder="Search" type="search" className="input" onChange={(e) => { setBusqueda(e.target.value) }} />
        </div>
      </div>
  
      <AddFiles ruta={ruta} setNewDir={setDirNuevo} setArchivoNuevo={setArchivoNuevo} />
  
      <div className="mydict">
        <div>
          <label className="mr-4">
            <input type="radio" name="radio" onClick={() => setFiltro("")} />
            <span>Todo</span>
          </label>
          <label className="mr-4">
            <input type="radio" name="radio" onClick={() => setFiltro("dir")} />
            <span>Directorios</span>
          </label>
          <label>
            <input type="radio" name="radio" onClick={() => setFiltro("file")} />
            <span>Archivos</span>
          </label>
        </div>
      </div>
  
      <div className=" p-2">
  
        <div className="w-full  mb-4 md:mb-0 md:mr-2 flex justify-center md:justify-start">
          <button className="w-full " onClick={RetrosesoRuta}>
            <div
              role="alert"
              className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105"
            >
              <i className="text-2xl fa-solid fa-hand-point-left"></i>
            </div>
          </button>
        </div>
  
        {DatosFiltrados().directorios.map((directorio, index) => (
          <DirectoryItem key={index} directorio={directorio} cambioRuta={cambioRuta} BorrarDir={() => BorrarDir(directorio)} />
        ))}
  
        {DatosFiltrados().archivos.map((archivo, index) => (
          <FileItem key={index} archivo={archivo} abrirFoto={abrirFoto} BorrarFile={() => BorrarFile(archivo)} />
        ))}
  
        <div className="modal fade rounded-5" id="popup3">
          <div className="modal-dialog">
            <div className="modal-content"><img alt="Image 3" className="rounded-5" src={imagen} /></div>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  
  );
}
