const readPath = require('./helpers/readPath');
const getLinksFromText = require('./helpers/getLinksFromText');
const getTextFromFile = require('./helpers/getTextFromFile');
const requestLinks = require('./helpers/requestLinks');
const printDataConsole = require('./helpers/printDataConsole');

function mdLinks(path, isValidate, isStats) {
  // nombre una constante que almacena los path que son extesion md
  const filePaths = readPath(path, '.md');
  // cree una variable que tiene un arreglo vacio para que me almacene todos los links
  let historyLinks = [];
  // iterar todos los archivos dentro de las rutas con extension md

  for (let index = 0, lengFiles = filePaths.length; index < lengFiles; index += 1) {
    const filepath = filePaths[index];
    // nombre una constante en donde almacenen el contenido de los archivos con extension md
    const textFile = getTextFromFile(filepath);
    // nombre una constante donde almacene los links y texto del link de esos archivos
    const links = getLinksFromText(textFile);
    // console.log(links);
    // guardo links en el arreglo de historyLinks
    historyLinks = [...historyLinks, ...links];
    // console.log(historyLinks);
  }

  if (isValidate && isStats) {
    requestLinks(historyLinks).then((fetchedLinks) => {
      // imprimir en la consola  el total de links
      printDataConsole('Total: ', historyLinks.length, '');
      // para obtener solamente los links consultados
      // ['http://google.com', '', '', '']
      const onlyLinks = fetchedLinks.map((fetchedLink) => fetchedLink.link);
      // constante que me permite filtrar los links repetidos y los guarda
      const uniqueLinks = onlyLinks.filter((value, index, array) => array.indexOf(value) === index);
      printDataConsole('Unique: ', uniqueLinks.length, '');
      // //constante que guarda links que su respuesta es que estan rotos
      const brokenLinks = fetchedLinks.filter((historyLink) => historyLink.code !== 200);
      printDataConsole('Broken: ', brokenLinks.length, '');
    });
  } else if (isStats) {
    requestLinks(historyLinks).then((fetchedLinks) => {
      // imprimir en la consola  el total de links
      printDataConsole('Total: ', historyLinks.length, '');
      // para obtener solamente los links consultados
      // ['http://google.com', '', '', '']
      const onlyLinks = fetchedLinks.map((fetchedLink) => fetchedLink.link);
      // constante que me permite filtrar los links repetidos y los guarda
      const uniqueLinks = onlyLinks.filter((value, index, array) => array.indexOf(value) === index);
      printDataConsole('Unique: ', uniqueLinks.length, '');
    });
  } else if (isValidate) {
    requestLinks(historyLinks).then((fetchedLinks) => {
      fetchedLinks.forEach((fetchedLink) => {
        printDataConsole(
          // filePaths
          '',
          fetchedLink.link,
          fetchedLink.text,
          fetchedLink.code,
          fetchedLink.status,
        );
      });
    });
  } else {
    historyLinks.forEach((historyLink) => {
      printDataConsole('', historyLink.link, historyLink.text);
    });
  }
}

// mdLinks('../README.md', false, false);

// mdLinks;
module.exports = mdLinks;
