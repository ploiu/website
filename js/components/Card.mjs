/** @type {HTMLTemplateElement} */
const cardTemplate = document.querySelector('template#cardTemplate') ??
  document.createElement('template');
cardTemplate.id = 'cardTemplate';
//language=html
cardTemplate.innerHTML = `
    <link rel="stylesheet" href="../../css/components/Card.css">
    <article class="card">
        <img alt="card banner image" class="card-banner">
        <span class="card-title"></span>
        <hr>
        <p class="card-description"></p>
    </article>
`;

document.body.appendChild(cardTemplate);

export class Card extends HTMLElement {
  /** @type {string|undefined} */
  #imagePath;
  /** @type {string} */
  #title;
  /** @type {string} */
  #description;
  /** @type {string|undefined} */
  #titleLink;

  constructor() {
    super();
  }

  onload() {
    this.render();
  }

  render() {
    [...this.children].forEach((it) => it.remove());
    const contents = cardTemplate.content.cloneNode(true);
    this.#imagePath = this.getAttribute('data-img') ?? this.#imagePath;
    this.#title = this.getAttribute('data-title-text') ?? this.#title;
    this.#titleLink = this.getAttribute('data-title-link') ?? this.#titleLink;
    this.#description = this.getAttribute('data-description') ??
      this.#description;
    const bannerElement = contents.querySelector('img.card-banner');
    const titleElement = contents.querySelector('span.card-title');
    const descriptionElement = contents.querySelector('p.card-description');
    if (!this.#imagePath) {
      bannerElement.hidden = true;
    } else {
      bannerElement.src = this.#imagePath;
    }
    if (this.#titleLink) {
      const a = document.createElement('a');
      a.target = '_blank';
      a.href = this.#titleLink;
      a.innerText = this.#title;
      titleElement.appendChild(a);
    } else {
      titleElement.innerText = this.#title;
    }
    descriptionElement.innerText = this.#description;
    this.appendChild(contents);
  }

  set imagePath(path) {
    this.removeAttribute('data-img');
    this.#imagePath = path;
    this.render();
  }

  set title(title) {
    this.removeAttribute('data-title-text');
    this.#title = title;
    this.render();
  }

  set description(description) {
    this.removeAttribute('data-description');
    this.#description = description;
    this.render();
  }

  set titleLink(link) {
    this.removeAttribute('data-title-link');
    this.#titleLink = link;
    this.render();
  }
}

if (!customElements.get('card-element')) {
  customElements.define('card-element', Card);
}
