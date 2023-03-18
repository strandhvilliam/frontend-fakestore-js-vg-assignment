import Component from "./Component.js";

class Spinner extends Component {

    constructor() {
        super();
    }
  render() {
    return (`
       <div class="spinner">
            <div class="spinner__circle"></div>
       </div>
    `);
  }
}

export default Spinner;
