import Component from "./Component.js";
import CartItemComponent from "./CartItemComponent.js";

class CartComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(`
        <div id="cart" class="cart">
            <h1 class="cart__header">
                <i class="fas fa-shopping-cart"></i>
                Your Cart
            </h1>
            <ul id="cart-items" class="cart__content">
                ${this.props.cart.map((product) => 
                        new CartItemComponent(product).render()).join('')}
            </ul>
            <div class="cart__footer">
                <div class="cart__total">
                    <span class="cart__total-text">Total</span>
                    <span id="cart-sum" class="cart__total-price">$${this.props.total.toFixed(2)}</span>
                </div>
                <button type="button" class="btn btn--checkout">Checkout</button>
                <button type="button" class="btn btn--clear">Clear All</button>
            </div>
        </div>
        `);
    }


}

export default CartComponent;
