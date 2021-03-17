import { LitElement, html, CSSResultArray } from 'lit-element';
import styles from './styles';

export class RobrezApp extends LitElement {
  static get styles(): CSSResultArray {
    return [styles];
  }

  render() {
    return html`
      <header>
        <div class="header-content">
          <div><h1 class="title">Rob Resendez</h1></div>
          <nav>
            <robrez-nav horizontal></robrez-nav>
          </nav>
        </div>
      </header>

      <main>
        <div class="main-content">
          <div class="subhead card">
            <h2>Hello World</h2>
          </div>

          <div class="card">lorem ipsum</div>
        </div>
      </main>

      <footer>
        <div class="footer-content">
          <div>Made with love &#10084;️</div>
        </div>
      </footer>
    `;
  }
}
