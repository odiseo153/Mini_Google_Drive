using Microsoft.AspNetCore.Mvc;
using System.Net;
using System;
using System.IO;
using System.Diagnostics;

namespace File_Manager_Api.Controllers
{
    [ApiController]
    public class FileController : Controller
    {
        string ruta = Directory.GetCurrentDirectory() + "\\datos";


        [HttpGet("Data")]
        public IActionResult Datos(string path)
        {

            var archivos = Directory.GetFiles(ruta + path)
                 .Select(directorio => Path.GetFileName(directorio))
            .ToList();

            var directorios = Directory.GetDirectories(ruta + path)
                   .Select(d => new DirectoryInfo(d).Name)
                   .ToList();


            return new JsonResult(new
            {
                archivos = archivos,
                directorios = directorios,
            });

        }

        [HttpGet("AbrirArchivo")]
        public IActionResult AbrirArchivo(string path)
        {
            var archivos = Path.GetFileName(ruta + path);

            byte[] imageData = System.IO.File.ReadAllBytes(ruta + path);

            // Establecer el tipo de contenido de la respuesta
            string contentType = "image/jpg";

            // Devolver la imagen como parte de la respuesta HTTP
            return File(imageData, contentType);

        }

        [HttpGet("Descargar")]
        public IActionResult Descargar()
        {
            string archivoOrigen = "./datos/odiseo.txt";
            string archivoDestino = "./odiseo.txt";

          
                // Crear proceso de inicio con información de configuración
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = "/bin/cp"; // Utiliza el comando 'cp' directamente
                startInfo.Arguments = $"{archivoOrigen} {archivoDestino}"; // Pasar los archivos origen y destino como argumentos
                startInfo.RedirectStandardOutput = true; // Redirigir la salida estándar
                startInfo.UseShellExecute = false; // No utilizar la shell del sistema
                startInfo.CreateNoWindow = true; // No crear ventana de consola

                // Iniciar el proceso
                Process proceso = new Process();
                proceso.StartInfo = startInfo;
                proceso.Start();

                // Leer y mostrar la salida estándar
                string resultado = proceso.StandardOutput.ReadToEnd();
                Console.WriteLine("Resultado del comando:");
                Console.WriteLine(resultado);

                proceso.WaitForExit(); // Esperar a que el proceso termine
                proceso.Close(); //  Cerrar el proceso


                return new JsonResult(new
            {
                message = "Descargado"
            });
        }


        [HttpPost("Files")]
        public IActionResult SubirArchivo(string path, IFormFile archivo)
        {
            string Ruta = ruta + "\\" + path;

            if (archivo != null && archivo.Length > 0)
            {
                // Aquí puedes guardar el archivo en el servidor
                // por ejemplo, usando la ruta del servidor y el nombre del archivo
                if (!Directory.Exists(Ruta))
                {
                    Directory.CreateDirectory(Ruta);
                }

                string rutaArchivo = Path.Combine(Ruta, archivo.FileName);

                using (var stream = new FileStream(rutaArchivo, FileMode.Create))
                {
                    archivo.CopyTo(stream);
                }

                return new JsonResult(new
                {
                    message = "Archivo subido exitosamente."
                });
            }

            return new JsonResult(new
            {
                message = "Error al subir archivo"
            });
        }

        [HttpDelete("File")]
        public IActionResult BorrarArchivos(string path, string nombreArchivo)
        {
            try
            {
                // Construye la ruta completa del archivo
                string rutaArchivo = Path.Combine(ruta + path, nombreArchivo);

                // Verifica si el archivo existe antes de intentar eliminarlo
                if (System.IO.File.Exists(rutaArchivo))
                {
                    // Elimina el archivo
                    System.IO.File.Delete(rutaArchivo);
                    return new JsonResult(new
                    {
                        message = "Archivo eliminado con éxito."
                    });
                }
                else
                {
                    return new JsonResult(new
                    {
                        message = $"El archivo {nombreArchivo} no existe."
                    });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    message = $"Error al intentar eliminar el archivo: {ex.Message}"
                });
            }


        }



        [HttpDelete("Folders")]
        public IActionResult BorrarDirectorio(string path, string directorio)
        {
            if (directorio != null && directorio.Length > 0)
            {
                // Aquí puedes guardar el directorio en el servidor
                // por ejemplo, creando una carpeta con el nombre del directorio

                string rutaDirectorio = Path.Combine(ruta + path, directorio);

                if (!Directory.Exists(rutaDirectorio))
                {
                    return new JsonResult(new
                    {
                        message = "Directorio no existe"
                    });
                }


                Directory.Delete(rutaDirectorio,true);

                return new JsonResult(new
                {
                    message = "Directorio Borrado Con Exito"
                });

            }


            return new JsonResult(new
            {
                message = "Tienes que mandar el nombre del directorio"
            });
        }

        [HttpPost("Folders")]
        public IActionResult SubirDirectorio(string path,string directorio)
        {
            if (directorio != null && directorio.Length > 0)
            {
                // Aquí puedes guardar el directorio en el servidor
                // por ejemplo, creando una carpeta con el nombre del directorio

                string rutaDirectorio = Path.Combine(ruta + path, directorio);

                if (Directory.Exists(rutaDirectorio))
                {
                    return new JsonResult(new
                    {
                        message = "Ya existe un directorio con ese nombre"
                    });
                }

                Directory.CreateDirectory(rutaDirectorio);
                
                return new JsonResult(new
                {
                    message = "Directorio subido exitosamente."
                });

            }

            return new JsonResult(new
            {
                message = "Error al subir directorio"
            });
        }
    }
}
