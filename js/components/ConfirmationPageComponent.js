import Component from "./Component.js";

class ConfirmationPageComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(`
            <div class="confirmation container">
                <h1 class="section-header">Order Confirmed</h1>
                <div class="confirmation__content">
                    <div class="confirmation__text">
                        <h3>Thank you ${this.props.data.firstname} for your order!</h3>
                        <p>The items will be delivered to you</p>
                    </div>
                    <img class="confirmation__image" src="images/celebration.png" alt="celebration">
                </div>
            </div>
        `);
    }
}

export default ConfirmationPageComponent;
