import Component from "./Component.js";

class CartItemComponent extends Component {

        constructor(props) {
            super(props);
        }

        render() {
            return (`
                <li class="cart-item" data-id="${this.props.id}">
                    <img class="cart-item__image" src="${this.props.image}" alt="">
                    <div class="cart-item__name">${this.props.title}</div>
                    <div class="cart-item__block">
                        <div class="cart-item__controls">
                            <button type="button" class="btn btn--minus"><i class="fa-solid fa-minus"></i></button>
                            <div class="cart-item__quantity">${this.props.quantity}</div>
                            <button type="button" class="btn btn--plus"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="cart-item__price">$${this.props.price * this.props.quantity}</div>
                    </div>
                    <button type="button" class="btn btn--remove cart-item__remove"><i class="fa-solid fa-xmark"></i></button>
                </li>
            `);
        }
}

export default CartItemComponent;
