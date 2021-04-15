const fetch = require('node-fetch');

const linkRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
// recibe el arreglo de links
function requestLinks(links = []) {
  return new Promise((resolve) => {
    // validar que lo que realmente voy hacerle un fetch sea un link,
    // arreglo de links validos que cumplan con la expresion regular

    const validLinks = links.filter(({ link }) => linkRegex.test(link));
    // console.log({ link }, linkRegex.test(link));

    // arreglo de consultas de cada link genero una respuesta
    const fetchsValidLinks = validLinks.map(({ link, text }) => fetch(link)
      .then((response) => ({
        link,
        text,
        code: response.status,
        status: response.statusText,
      }))
      .catch(() => ({
        link,
        text,
        code: 500,
        status: 'fail',
      })));
    // mando a jecutar todos
    // (then):ya me contesto todo
    Promise.all(fetchsValidLinks).then((fetchedLinks) => {
      resolve(fetchedLinks);
    });
  });
}

// console.log(requestLinks(prueba));

module.exports = requestLinks;
