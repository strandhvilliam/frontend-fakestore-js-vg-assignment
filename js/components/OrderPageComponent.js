import Component from "./Component.js";
import CartItemComponent from "./CartItemComponent.js";
import * as constants from "../constants.js";

class OrderPageComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(`
            <div class="order container">
                <h1 class="section-header">${this.props.title}</h1>
                
                <div class="order__content">
                    <ul class="order__list">
                        ${this.props.cart.map((item) => new CartItemComponent(item).render()).join('')}
                    </ul>
                    <div class="order__total">
                        <div class="order__total-text">Total</div>
                        <div class="order__total-sum">$${this.props.total}</div>
                    </div>
                </div>
                
                <h1 class="section-header">Enter Delivery Info</h1>
                <form id="order-form" class="order__form">
                    <div class="order__row">
                        <div class="order__group">
                            <label for="firstname-input">Firstname</label>
                            <input class="input-field" id="firstname-input" name="firstname" type="text" value="">
                            <p id="firstname-error" class="order__error">${constants.NAME_ERROR}</p>
                        </div>
                        <div class="order__group">
                            <label for="lastname-input">Lastname</label>
                            <input class="input-field" id="lastname-input" name="lastname" type="text" value="">
                            <p id="lastname-error" class="order__error">${constants.NAME_ERROR}</p>
                        </div>
                        
                    </div>
                    <div class="order__row">
                        <div class="order__group">
                            <label for="email-input">Email</label>
                            <input class="input-field" id="email-input" name="email" type="text" value="">
                            <p id="email-error" class="order__error">${constants.EMAIL_ERROR}</p>
                        </div>
                    </div>
                    <div class="order__row">
                        <div class="order__group">
                            <label for="street-input">Street</label>
                            <input class="input-field" id="street-input" name="street" type="text" value="">
                            <p id="street-error" class="order__error">${constants.STREET_ERROR}</p>
                        </div>
                        <div class="order__group">
                            <label for="phone-input">Phone</label>
                            <input class="input-field" id="phone-input" name="phone" type="text" value="">
                            <p id="phone-error" class="order__error">${constants.PHONE_ERROR}</p>
                        </div>
                    </div>
                    
                    <div class="order__row">
                        <div class="order__group">
                            <label for="zip-input">Zip Code</label>
                            <input class="input-field" id="zip-input" name="zip" type="text" value="">
                            <p id="zip-error" class="order__error">${constants.ZIP_ERROR}</p>
                        </div>
                        <div class="order__group">
                            <label for="city-input">City</label>
                            <input class="input-field" id="city-input" name="city" type="text" value="">
                            <p id="city-error" class="order__error">${constants.CITY_ERROR}</p>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn--order">Order</button>
                </form>
            </div>
            
        `);
    }
}

export default OrderPageComponent;
