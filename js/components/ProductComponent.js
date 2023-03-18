import Component from './Component.js';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (`
            <div class="item" data-id="${this.props.id}">
                    <img class="item__image" src="${this.props.image}" alt="">
                    <div class="item__info">
                        <div class="item__name">${this.props.title}</div>
                        <div class="item__price">$${this.props.price}</div>
                    </div>
                    <button type="button" class="btn btn--add">Add</button>

            </div>
        `);
    }
}

export default ProductComponent;
