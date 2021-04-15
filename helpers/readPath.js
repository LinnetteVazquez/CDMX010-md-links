const fs = require('fs');
const path = require('path');

/*
readPath:
De un path te va regresar un arreglo de paths que cumplan con la condicion de extension
recibe un paht y entrega un array, si viene una extension me regresa los que tengan esa extension
1. funcion primaria
pathDir es la ruta, la cual puede ser relativa o absoluta,
si es relativa debo cambiarla a absoluta (directorio de toda la compu =__dirname)
tengo que buscar dentro de todos los directorios o carpetas aquellas que sean extension md
FUNCION QUE LEE LOS DIRECTORIOS DE FORMA RECURSIVA
*/
function readPath(pathDir, extension) {
  let pathDirectory = pathDir;
  // verificar si el path es absoluto
  const isAbsolutePath = path.isAbsolute(pathDirectory);
  // console.log(isAbsolutePath);
  // si no es absoluto lo convertimos
  if (!isAbsolutePath) {
    /* con join al agregarle __dirname (ruta de la computadora) mas la ruta relativa:
    es la union de la ruta original de mi compu con la ruta relativa
   */
    pathDirectory = path.join(__dirname, pathDirectory);
  }
  // si no es un directorio solo es un archivo y lo regreso con el path  absoluto del  archivo
  if (!fs.lstatSync(pathDirectory).isDirectory()) {
    return [pathDirectory];
  }
  // console.log(pathDir);
  //   console.log("=======");
  // lee el contenido del path (arreglo de paths relativos)
  const relativePaths = fs.readdirSync(pathDirectory);
  // console.log(relativePaths);
  // arreglo vacio ; aqui vamos a agregar los path (acumulador de paths)
  let paths = [];
  // iterar sobre los path relativos

  for (let index = 0, pathFile = relativePaths.length; index < pathFile; index += 1) {
    const relativePath = relativePaths[index];
    // creo un path absoluto a partir del relativo por cada iteracion
    const dynamicPathAbsolute = path.join(pathDir, relativePath);
    // console.log(dynamicPathAbsolute);
    // evaluo el path absoluto sea un directorio
    const isDirectory = fs.lstatSync(dynamicPathAbsolute).isDirectory();
    // console.log(isDirectory);
    if (isDirectory) {
      // hago un  llamado a mi funcion (recursividad) para leer las carpetas
      const deepPaths = readPath(dynamicPathAbsolute, extension);
      // el resultado lo concateno al acumulador actual (paths)
      paths = paths.concat(deepPaths);
    } else {
      // obtengo la extension del archivo
      const extensionFile = path.extname(dynamicPathAbsolute);
      // evaluo que si existe extension
      if (extensionFile === extension) {
        // la comparo para saber si es igual y la agrego a paths
        paths.push(dynamicPathAbsolute);
      }

      //
    }
  }
  return paths;
}
// console.log(readPath('./', '.md'));

module.exports = readPath;
