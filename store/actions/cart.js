export const ADD_CART = 'ADD_CART';

export const addCart = (item) => {
    return {
        type: ADD_CART,
        item
    };
};