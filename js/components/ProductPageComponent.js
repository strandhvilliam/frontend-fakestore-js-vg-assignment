import Component from './Component.js';
import ProductComponent from './ProductComponent.js';

class ProductPageComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (`
            <h1 class="section-header">${this.props.title}</h1>
            <div class="grid container">
                ${this.props.items.map((product) => {
                    return new ProductComponent(product).render();}).join('')}
            </div>
        `);
    }
}

export default ProductPageComponent;
