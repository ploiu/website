const dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric' });
const footerTemplate = document.createElement('template');
footerTemplate.id = 'footerTemplate';
//language=html
footerTemplate.innerHTML = `
<footer>
    <div id="footerContents" class="row">
    <!-- copyright -->
    <div class="col-4">
        &copy; Ploiu
        <span id="copyrightDate">Whenver you're reading this</span>
    </div>
    <!-- github links -->
    <div class="col-4">
        <ul id="githubLinks" class="unstyled">
        <li><a href="https://github.com/ploiu/website">Source Code</a></li>
        <li><a href="https://github.com/ploiu">My Github</a></li>
        </ul>
    </div>
    <!-- other links -->
    <div class="col-4">
        <ul class="unstyled">
        <li><a href="/pages/libraries-used.html">Libraries Used For This Site</a></li>
        <li><a href="/pages/login.html">Administrator Login</a></li>
        </ul>
    </div>
    </div>
</footer>
`;
document.body.appendChild(footerTemplate);

/** so that I don't have to copy and paste all of the footer contents on every page. Less code for me to maintain at the cost of some JS stuff */
class Footer extends HTMLElement {
  #now = dateFormat.format(new Date());

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const contents = footerTemplate.content.cloneNode(true);
    contents.querySelector('#copyrightDate').innerText = this.#now;
    this.appendChild(contents);
  }
}

customElements.define('footer-element', Footer);
