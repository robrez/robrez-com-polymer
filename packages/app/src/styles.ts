import { css } from 'lit-element';

export default css`
  :host {
    display: block;
    --robrez-dark: rgba(0, 0, 0);
    --robrez-dark-90: rgba(0, 0, 0, 0.9);
    --robrez-dark-80: rgba(0, 0, 0, 0.8);
    --robrez-dark-70: rgba(0, 0, 0, 0.7);
    --robrez-dark-60: rgba(0, 0, 0, 0.6);
    --robrez-dark-50: rgba(0, 0, 0, 0.5);
    --robrez-dark-40: rgba(0, 0, 0, 0.4);
    --robrez-dark-30: rgba(0, 0, 0, 0.3);
    --robrez-dark-20: rgba(0, 0, 0, 0.2);
    --robrez-dark-10: rgba(0, 0, 0, 0.1);
    --robrez-dark-5: rgba(0, 0, 0, 0.05);

    --robrez-light: rgba(255, 255, 255);
    --robrez-light-90: rgba(255, 255, 255, 0.9);
    --robrez-light-80: rgba(255, 255, 255, 0.8);
    --robrez-light-70: rgba(255, 255, 255, 0.7);
    --robrez-light-60: rgba(255, 255, 255, 0.6);
    --robrez-light-50: rgba(255, 255, 255, 0.5);
    --robrez-light-40: rgba(255, 255, 255, 0.4);
    --robrez-light-30: rgba(255, 255, 255, 0.3);
    --robrez-light-20: rgba(255, 255, 255, 0.2);
    --robrez-light-10: rgba(255, 255, 255, 0.1);
    --robrez-light-5: rgba(255, 255, 255, 0.05);

    --robrez-base-bg-color: var(--robrez-dark-5);
    --robrez-header-bg-color: var(--robrez-dark-80);
    --robrez-header-text-color: var(--robrez-light-90);

    --robrez-primary-color: dodgerblue;
    --robrez-large-divider-width: 6px;
    --robrez-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-family: var(--robrez-font-family);
    background-color: var(--robrez-base-bg-color);
  }

  h1,
  h2 {
    margin: 0;
  }

  header {
    padding: 1rem;
    background: var(--robrez-header-bg-color);
    color: var(--robrez-header-text-color);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1024px;
  }

  .title {
    margin: 0;
    text-shadow: 0 2px 2px rgb(0 0 0 / 40%), 0 1px 5px rgb(0 0 0 / 12%),
      0 3px 1px rgb(0 0 0 / 20%);
  }

  main {
    min-height: 80vh;
    padding: 1rem;
    background: linear-gradient(
      180deg,
      var(--robrez-header-bg-color),
      var(--robrez-header-bg-color) 56px,
      var(--robrez-primary-color) 56px,
      var(--robrez-primary-color) calc(56px + var(--robrez-large-divider-width)),
      transparent 1px
    );
  }

  .main-content {
    margin: 0 auto;
    max-width: 1024px;
  }

  .card {
    padding: 1rem;
    border-radius: 2px;
    border: 1px solid var(--robrez-dark-20);
    background-color: var(--robrez-light);
    color: var(--robrez-dark-80);
    margin: 1rem;
  }

  footer {
    padding: 1rem;
    background: var(--robrez-header-bg-color);
    color: var(--robrez-header-text-color);
    border-top: var(--robrez-large-divider-width) solid
      var(--robrez-primary-color);
    min-height: 200px;
  }

  .footer-content {
    margin: 0 auto;
    max-width: 1024px;
  }
`;
