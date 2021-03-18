import {
  LitElement,
  html,
  PropertyValues,
  CSSResultArray,
  TemplateResult,
  property,
} from 'lit-element';
import { Template } from 'lit-html';
import { installRouter } from 'pwa-helpers/router';
import styles from './styles';

enum AppPage {
  home = 'home',
  blog = 'blog',
  projects = 'projects',
  resume = 'resume',
  notfound = 'notfound',
}

export class RobrezApp extends LitElement {
  @property({ type: String }) page: AppPage;

  constructor() {
    super();
    this.page = AppPage.home;
    this.setAttribute('dark', '');
  }

  static get styles(): CSSResultArray {
    return [styles];
  }

  firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);
    installRouter(this.onRoueChange.bind(this));
  }

  private onRoueChange(location: Location, event: Event | null): void {
    // Only scroll to top on link clicks, not popstate events.
    if (event && event.type === 'click') {
      window.scrollTo(0, 0);
    }
    if (
      !location.pathname ||
      location.pathname === '/' ||
      location.pathname.startsWith(`/${AppPage.home}`)
    ) {
      this.page = AppPage.home;
      return;
    }
    if (location.pathname.startsWith(`/${AppPage.blog}`)) {
      this.page = AppPage.blog;
      return;
    }
    if (location.pathname.startsWith(`/${AppPage.projects}`)) {
      this.page = AppPage.projects;
      return;
    }
    if (location.pathname.startsWith(`/${AppPage.resume}`)) {
      this.page = AppPage.resume;
      return;
    }
    this.page = AppPage.notfound;
  }

  render(): TemplateResult {
    return html`
      <header>
        <div class="header-content">
          <div>
            <h1 class="title">Rob Resendez</h1>
            <div class="caption">Software development and other musings</div>
          </div>
          <nav>
            <robrez-nav horizontal></robrez-nav>
          </nav>
        </div>
      </header>

      <main>
        <div class="main-content">${this.renderActivePage()}</div>
      </main>

      <footer>
        <div class="footer-content">
          <div>Made with love &#10084;️</div>
        </div>
      </footer>
    `;
  }

  private renderActivePage(): TemplateResult {
    const page: AppPage = this.page || AppPage.notfound;
    switch (page) {
      case AppPage.blog:
        return this.renderBlog();
      case AppPage.home:
        return this.renderHome();
      case AppPage.projects:
        return this.renderProjects();
      case AppPage.resume:
        return this.renderResume();
      default:
        return this.renderNotFound();
    }
  }

  private renderGenericHeading(value: string): TemplateResult {
    return html`
      <div class="subhead card">
        <div class="card-heading">
          <h2>${value}</h2>
        </div>
      </div>
    `;
  }

  private renderHome(): TemplateResult {
    return html` ${this.renderGenericHeading('Hello')}

      <div class="card">
        <div class="card-heading divider"><h3>Lorem Ipsum</h3></div>
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </div>
      </div>`;
  }

  private renderBlog(): TemplateResult {
    return html`${this.renderGenericHeading('Blog')}`;
  }

  private renderProjects(): TemplateResult {
    return html`${this.renderGenericHeading('Projects')}`;
  }

  private renderResume(): TemplateResult {
    return html`
      ${this.renderGenericHeading('Resume')}

      <div class="card">
        <div class="card-heading divider"><h3>Lorem Ipsum</h3></div>
        <div class="card-body">
          Shared Solutions - January 2020 - Present Develop and maintain
          web-components that can be used in any framework or dom environment.
          This is done via modern web standards and technologies including:
          lit-html, LitElement, typescript, rollup, sinon Architect
          design-system components which conform to UI/UX specifications and
          serve as building-blocks for higher-order features. Use these
          primitives to create user-facing feature-components. Assist other
          teams and team members with their own features and integrations
          Application R&D - January 2018 - January 2020 Create framework used by
          developers to create applications which make up an electronic health
          record (EHR) system. Some technologies in the stack include java,
          jersey, jetty, polymer (web components), postgresql, nginx SMART FHIR
          API - April 2017 - Present Create REST framework for providing
          standards-based data access conforming to the SMART on FHIR
          specification and in compliance with "Meaningful Use" certification
          requirements Create authorization server and which complies with the
          OAuth2, OpenID Connect standards. Create client registration and
          administrative portal web applications. Work with 3rd-party
          integrators to ensure ability to utilize the auth and resource servers
          Patient Portal - November 2015 - December 2017 Create a "Meaningful
          Use"-certified web application used by patients to access medical
          records Application Development - January 2007 - November 2015 Create,
          enhance and maintain a wide array of applications and features
          utilized in a healthcare environment such as RAI/MDS and Clinical
          Quality Measures (CQM).
        </div>
      </div>
    `;
  }

  private renderNotFound(): TemplateResult {
    return html`404 not found`;
  }
}
