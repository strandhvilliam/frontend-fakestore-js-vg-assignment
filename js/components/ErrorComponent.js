import Component from "./Component.js";

class ErrorComponent extends Component {

    constructor(props) {
        super(props);
    }
  render() {
    return (`
      <div class="error">
        <h1 class="error__message">${this.props}</h1>
      </div>
    `);
  }
}

export default ErrorComponent;
