/** @type {HTMLTemplateElement} */
const chooserTemplate = document.querySelector('template#chooserTemplate') ?? document.createElement('template');
chooserTemplate.id = 'chooserTemplate';
//language=html
chooserTemplate.innerHTML = `
    <div id="themeChooser">
        <button id="themeButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
        </button>
        <div id="themeList" hidden></div>
    </div>
`;
/** @type {HTMLTemplateElement} */
const swatchTemplate = document.querySelector('template#swatchTemplate') ?? document.createElement('template');
swatchTemplate.id = 'swatchTemplate';
//language=html
swatchTemplate.innerHTML = `
    <div class="swatch row">
        <div class="col-3-sm" style="background-color: var(--theme-background)"></div>
        <div class="col-3-sm" style="background-color: var(--theme-text-primary)"></div>
        <div class="col-3-sm" style="background-color: var(--theme-accent)"></div>
        <div class="col-3-sm" style="background-color: var(--theme-link)"></div>
    </div>
`;

document.body.appendChild(chooserTemplate);
document.body.appendChild(swatchTemplate);

const themeNames = ['light', 'dark', 'gb-studio', 'mewtwo'];

export class ThemeChooser extends HTMLElement {
  #drawerVisible = false;
  #connected = false;

  constructor() {
    super();
  }

  // noinspection JSUnusedGlobalSymbols; it's used by the browser
  connectedCallback() {
    if (!this.#connected) {
      this.render();
      this.querySelector('#themeButton').addEventListener('click', () => this.toggleDrawer());
      document.body.addEventListener('click', (e) => this.#anywhereElseClicked(e));
    }
    this.#connected = true;
  }

  render() {
    [...this.children].forEach((it) => it.remove());
    const contents = chooserTemplate.content.cloneNode(true);
    const drawer = contents.querySelector('div#themeList');
    this.appendChild(contents);
    for (const theme of themeNames) {
      const swatch = this.#createSwatch(theme);
      drawer.appendChild(swatch);
    }
  }

  /**
   * creates a swatch of the 4 main colors of the theme:
   * - background
   * - text-primary
   * - accent
   * - link
   * @param {string} theme
   * @returns {Node}
   */
  #createSwatch(theme) {
    const swatch = swatchTemplate.content.cloneNode(true);
    const node = swatch.children[0];
    node.setAttribute('data-theme', theme);
    node.addEventListener('click', () => {
      setTheme(theme);
      this.toggleDrawer();
    });
    return swatch;
  }

  /**
   * for use when anywhere outside of this element is clicked
   * @param {MouseEvent} e
   */
  #anywhereElseClicked(e) {
    if (e.target !== this.querySelector('#themeButton') && !this.contains(e.target) && this.#drawerVisible) {
      this.toggleDrawer();
    }
  }

  /**
   * shows or hides the theme list
   */
  toggleDrawer() {
    this.querySelector('#themeList').hidden = this.#drawerVisible;
    this.#drawerVisible = !this.#drawerVisible;
  }
}

if (!customElements.get('theme-chooser')) {
  customElements.define('theme-chooser', ThemeChooser);
}
