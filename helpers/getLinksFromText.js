// FUNCION QUE ME LEE links de cualquier texto, le paso como parametro un texto
function getLinksFromText(stringText) {
  // obtener todas las coincidencias del tipo md esta expresion regular
  const regexExpresion = /\[([^[]+)\](\(.*\))/gm;
  // de ese texto encuentre todas las coincidencias de links y texto
  // listado de coincidencias
  const matches = stringText.match(regexExpresion);
  // console.log(matches);
  // extraer todas las coincidencias de un link tipo md
  const singleMatch = /\[([^[]+)\]\((.*)\)/;
  // en esta variable genere un arreglo para que solo me extrajera links individuales
  // match = coincidencia
  const links = (matches || []).map((match) => {
    // console.log(matches || []);
    // destructure el arreglo y lo retorne a link
    const [, text, link] = singleMatch.exec(match);
    return { text, link };
  });
  // aqui imprimo los links en un arreglo
  return links;
}

module.exports = getLinksFromText;
// const prueba = `Con el comando  podemos instalar directamente
// desde GitHub. Ver [docs oficiales de npm install acá](https://docs.npmjs.com/cli/install).
// Por ejemplo, el [course-parser](https://github.com/Laboratoria/course-parser)
// que usamos para la currícula no está publicado en el registro público de NPM,
// así que lo instalamos directamente desde GitHub con el comando `;

// console.log(getLinksFromText(prueba));
