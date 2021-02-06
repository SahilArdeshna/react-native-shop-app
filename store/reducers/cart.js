import { ADD_CART } from '../actions/cart';
import CartItem from '../../models/cart';

const initialState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CART:
            const product = action.item;
            const productPrice = product.price;
            const productTitle = product.title;

            let updatedOrNewCartItem;

            if (state.items[product.id]) {
                // For already added product
                updatedOrNewCartItem = new CartItem(
                    state.items[product.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[product.id].sum + productPrice
                );

            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            
            return {
                ...state,
                totalAmount: state.totalAmount + productPrice,
                items: {
                    ...state.items,
                    [product.id]: updatedOrNewCartItem
                }
            };
        default:
            return {
                ...state
            };
    };
};

export default cartReducer;