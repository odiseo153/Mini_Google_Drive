export const DirectoryItem = ({ directorio, cambioRuta, BorrarDir }: { directorio: string, cambioRuta: (directorio: string) => void, BorrarDir: (directorio: string) => void }) => (

  <div className="p-1 md:flex md:justify-between md:items-center">

    <button className="w-full " onClick={() => cambioRuta(directorio)}>
      <div
        role="alert"
        className=" bg-blue-100 dark:bg-blue-900  text-blue-900 dark:text-blue-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-800 transform  mb-2 md:mb-0"
      >
        <i className="fa-solid fa-folder"></i>
        <p className="ml-2 text-1xl font-semibold">{directorio}</p>
      </div>
    </button>

    <button className='btn btn-danger h-10 w-10 m-2 flex items-center justify-center' onClick={() => BorrarDir(directorio)}>
      <i className="fas fa-trash"></i>
    </button>
    
  </div>
);
 