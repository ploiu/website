// a collection of sections and cards that go in them

import './components/Card.mjs'; // for side effects and card element

/**
 * represents a Card element in js form
 * @param title {string}
 * @param description {string}
 * @param titleLink {string?}
 * @param imagePath {string?}
 * @constructor
 */
function CardItem(title, description, titleLink, imagePath) {
  this.title = title;
  this.description = description;
  this.titleLink = titleLink;
  this.imagePath = imagePath;
}

CardItem.prototype.toElement = function () {
  const elem = document.createElement('card-element');
  elem.title = this.title;
  elem.description = this.description;
  elem.titleLink = this.titleLink;
  elem.imagePath = this.imagePath;
  elem.classList.add('col-xs-12', 'col-sm-6', 'col-lg-3');
  return elem;
};

/** @typedef {{string: CardItem[]}} */
const cards = {
  projects: [
    new CardItem('Website', 'You are here.', 'https://github.com/ploiu/website'),
    new CardItem(
      'File_Server',
      "A self-hostable file backup server designed to be run on your local network on a raspberry pi. My first project written in Rust, so I'm pretty proud of it.",
      'https://github.com/ploiu/file_server',
    ),
    new CardItem(
      'File-Server-UI',
      'A frontend for File_Server. Built using plain java and javafx.',
      'https://github.com/ploiu/file-server-ui',
    ),
    new CardItem(
      'Mock-Server',
      'A mock web server built using deno, with portable config and options for forwarding requests to other urls.',
      'https://github.com/ploiu/mock-server',
    ),
    new CardItem(
      'Vanilla-JS-Accordions',
      'A simple accordion library using web components.',
      'https://github.com/ploiu/vanilla-js-accordions',
    ),
    new CardItem(
      'Landing-Page',
      'A simple, customizable landing page using custom elements',
      'https://github.com/ploiu/landing-page',
    ),
    new CardItem(
      'ElementalItems',
      'My first large project - a mod for the game Minecraft that adds weapons, tools, and armor based on the elements.',
      'https://github.com/ploiu/elementalitems',
    ),
    new CardItem(
      'PythonPong',
      'A fun game in python based on pong, but with power ups. Uses SNES controller mappings',
      'https://github.com/ploiu/pythonPong',
    ),
    new CardItem(
      'arg-helper',
      'A javascript library for Deno that validates args passed to simple scripts',
      'https://jsr.io/@ploiu/arg-helper'
    )
  ],
};

/**
 * generates `card-element`s for the cards in the section with the passed name
 * @param {string} section
 * @return {HTMLElement[]}
 */
export function genCards(section) {
  /** @type {CardItem[]} */
  const sectionCards = cards[section];
  if (!sectionCards) {
    throw `No cards with the section ${section}`;
  }
  return sectionCards.map((it) => it.toElement());
}
