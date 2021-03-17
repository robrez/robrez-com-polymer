import { css } from 'lit-element';

export default css`
  :host {
    display: block;
  }
  :host([horizontal]) {
    display: inline-block;
  }
  :host([horizontal]) li {
    display: inline-block;
    margin-left: 1rem;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    opacity: 0.8;
  }
  li:hover {
    opacity: 1;
  }
  a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
`;
