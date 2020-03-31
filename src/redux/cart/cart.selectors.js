import { createSelector } from 'reselect';

// input selectors
const selectCart = state => state.cart;

// input/output selector
export const selectCartItems = createSelector(
    [selectCart], // input selector
    (cart) => cart.cartItems // output we want (from cart we only need cartItems)
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems], // use existing created selector
    cartItems => cartItems.reduce( // output we want
        (accumlatedQty, cartItem) => accumlatedQty + cartItem.quantity,
        0
      )
);

