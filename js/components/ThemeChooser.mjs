/** @type {HTMLTemplateElement} */
const chooserTemplate = document.querySelector('template#chooserTemplate') ?? document.createElement('template');
chooserTemplate.id = 'chooserTemplate';
//language=html
chooserTemplate.innerHTML = `
    <div id="themeChooser">
        <button id="themeButton">
            <i class="fa-solid fa-palette"></i>
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
        <div class="col-xs-6 col-sm-3" style="background-color: var(--theme-background)"></div>
        <div class="col-xs-6 col-sm-3" style="background-color: var(--theme-text-primary)"></div>
        <div class="col-xs-6 col-sm-3" style="background-color: var(--theme-accent)"></div>
        <div class="col-xs-6 col-sm-3" style="background-color: var(--theme-link)"></div>
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
