import {
  property,
  css,
  CSSResult,
  LitElement,
  html,
  TemplateResult,
} from 'lit-element';
import { resolve, entries } from '../assets/index';

export class RobrezBlog extends LitElement {
  @property() currentPage: TemplateResult | null | undefined = null;

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
    `;
  }

  firstUpdated(): void {
    resolve('hello-world').then(result => {
      this.currentPage = result as TemplateResult;
    });
  }

  render(): TemplateResult {
    return html`
      <div>${this.renderEntries()}</div>

      <div>${this.currentPage}</div>
    `;
  }

  private renderEntries(): TemplateResult[] {
    return entries.map(entry => {
      const tmpl = html`
        <button @click="${() => this.resolveItem(entry)}">${entry}</button>
      `;
      return tmpl;
    });
  }

  private resolveItem(name: string): void {
    resolve(name).then(result => {
      this.currentPage = result as TemplateResult;
    });
  }
}
