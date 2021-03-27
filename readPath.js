const fs = require("fs");
const path = require("path");

/*
readPath:
de un path te va regresar un arreglo de paths que cumplan con la condicion de extension
recibe un paht y entrega un array, si viene una extension me regrrsa los que tengan esa extension
1. funcion primaria
pathDir es la ruta, la cual puede ser relativa o absoluta, si es relativa debo cambiarla a absoluta (directorio de toda la compu =__dirname)
tengo que buscar dentro de todos los directorios o carpetas aquellas que sean extension md
*/
function readPath(pathDir, extension) {
  //verificar si el path es absoluto
  const isAbsolutePath = path.isAbsolute(pathDir);
  //console.log(isAbsolutePath);
  //si no es absoluto lo convertimos
  if (!isAbsolutePath) {
    pathDir = path.join(__dirname, pathDir);
  }
  //   console.log(pathDir);
  //   console.log("=======");
  //lee el contenido del path
  const relativePaths = fs.readdirSync(pathDir);
  //console.log(relativePaths);
  //arreglo vacio ; aqui vamos a agregar los path (acumulador de paths)
  let paths = [];
  // iterar sobre los path relativos
  for (let relativePath of relativePaths) {
    // creo un path absoluto a partir del relativo por cada iteracion
    const dynamicPathAbsolute = path.join(pathDir, relativePath);
    // console.log(dynamicPath);
    //evaluo el path absoluto sea un directorio
    const isDirectory = fs.lstatSync(dynamicPathAbsolute).isDirectory();
    //console.log(isDirectory);

    if (isDirectory) {
      //hago un  llamado a mi funcion (recursividad) para leer las cvarpetas
      const deepPaths = readPath(dynamicPathAbsolute, extension);
      //el resultado lo concateno al acumulador actual (paths)
      paths = paths.concat(deepPaths);
    } else {
      //evaluo que si existe extension
      if (extension) {
        //obtengo la exrension del path
        const extrensionFile = path.extname(dynamicPathAbsolute);
        //la comparo para saber si es igual y la agrego a paths
        if (extension === extrensionFile) {
          paths.push(dynamicPathAbsolute);
        }
        //
      } else {
        paths.push(dynamicPathAbsolute);
      }
    }
  }
  return paths;
}
//console.log(readPath("./", ".md"));

module.exports = readPath;
