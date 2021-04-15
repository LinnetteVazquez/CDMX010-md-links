/* eslint-disable no-undef */
// const getLinksFromText = require('../helpers/getLinksFromText');
const readPath = require('../helpers/readPath');
const getTextFromFile = require('../helpers/getTextFromFile');
const getLinksFromText = require('../helpers/getLinksFromText');
const requestLinks = require('../helpers/requestLinks');
const {
  text, links, links2, requesLinks,
} = require('./helpers');

describe('md-links', () => {
  // descripcion de cada una de mis pruebas
  it('should return every md path', () => {
    expect(readPath('../ejem1/message1.md', '.md'))
      .toEqual(expect.arrayContaining(['/Users/linnvazquez/repositories/CDMX010-md-links/ejem1/message1.md']));
  });

  it('should return container from file', () => {
    expect(getTextFromFile('/Users/linnvazquez/repositories/CDMX010-md-links/ejem1/message1.md'))
      .toBe(text);
  });

  it('should return to links', () => {
    expect(getLinksFromText(text))
      .toStrictEqual(links);
  });

  it('should return the status of each link', () => {
    expect(requestLinks(links2).then((result) => {
      expect(result).toEqual(requesLinks);
    }));
  });
});
