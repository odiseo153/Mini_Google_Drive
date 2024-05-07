import React from 'react';

interface FileItemProps {
  archivo: string;
  BorrarFile: (archivo: string) => void;
  abrirFoto: (nombreFile: string) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ archivo, BorrarFile, abrirFoto }) => (

  <div className="p-1 md:flex md:justify-between md:items-center">

    <div
      role="alert"
      className="form-control bg-green-300 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105 mb-2 md:mb-0"
    >
      {archivo.endsWith(".jpg") ? (
        <i className="fa-solid fa-image"></i>
      ) : (
        <i className="fas fa-file"></i>
      )}
      <p className="ml-2 text-1xl font-semibold truncate" title={archivo}>{archivo}</p>

      {archivo.endsWith(".jpg") && (
        <button
          className="btn flex-shrink-0" // Agregamos la clase flex-shrink-0 para que el botón no se encoga en dispositivos móviles
          data-bs-target="#popup3"
          data-bs-toggle="modal"
          onClick={() => abrirFoto(archivo)}
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      )}
    </div>
  
    <button className='btn btn-danger ml-1' onClick={() => BorrarFile(archivo)}>
      <i className="fas fa-trash"></i>
    </button>
  </div>
);

export default FileItem;
 