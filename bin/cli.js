#!/usr/bin/env node
const process = require('process');
const mdLinks = require('../index');

function cli(args) {
  // recibe parametros
  // console.log(args);
  const [, , path] = args;
  const isValidate = args.includes('--validate');
  const isStats = args.includes('--stats');
  mdLinks(path, isValidate, isStats);
}

cli(process.argv);
