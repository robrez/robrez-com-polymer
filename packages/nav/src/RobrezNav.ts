import { LitElement, html, property, CSSResultArray } from 'lit-element';
import styles from './styles';

export class RobrezNav extends LitElement {
  @property({ type: Boolean, reflect: true }) horizontal: boolean;

  constructor() {
    super();
    this.horizontal = false;
  }

  static get styles(): CSSResultArray {
    return [styles];
  }

  render() {
    return html`
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/resume">Resume</a></li>
      </ul>
    `;
  }
}
