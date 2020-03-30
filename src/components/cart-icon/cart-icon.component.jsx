import React from "react";
import { connect } from "react-redux";
import {} from "../../redux/cart/cart.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShoppingLogo } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden,itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingLogo className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce(
    (accumlatedQty, cartItem) => accumlatedQty + cartItem.quantity,
    0
  )
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
