/* eslint-disable max-len */
const chalk = require('chalk');

function printDataConsole(path, link, text, code, status) {
  // guarda en una variable los primeros 3 argumentos con su respectivo color para que se puedan imprimir en la consola y se diferencien == template base
  let textlog = `${chalk.yellow(path)} ${chalk.magentaBright(
    link,
  )} ${chalk.cyanBright(text)} `;
  // evaluando si existe el parametro code
  if (code) {
    // evaluo que tipo de code es y posteriormente le asigno color
    const codeText = code === 200 ? chalk.green(code) : chalk.red(code);
    // console.log(code === 200);
    // agrego al template base
    textlog += ` ${codeText} `;
  }
  if (status) {
    // evaluo que tipo de STATUS es y posteriormente le asigno color
    const statusText = status === 'OK' ? chalk.bgGreen(status) : chalk.bgRed(status);
    // agrego al template base
    textlog += `${statusText}`;
  }

  console.log(textlog);
}

module.exports = printDataConsole;
