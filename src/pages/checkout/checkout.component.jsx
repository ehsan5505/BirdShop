import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
// import {StripeButtonCheckout} from '../../components/stripe-button/stripe-button.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const CheckOut = ({cartItems,total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='checkout-block'>
                <span>Product</span>
            </div>
            <div className='checkout-block'>
                <span>Description</span>
            </div>
            <div className='checkout-block'>
                <span>Quantity</span>
            </div>
            <div className='checkout-block'>
                <span>Price</span>
            </div>
            <div className='checkout-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
                (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)    
            )
        }
        <div className='total'>
            <span>Total: Rs. {total}</span>
        </div>

        <StripeCheckoutButton price={total} />

        <div className="test-info">
            Test card number 4000 0025 0000 3155 with any CVC, future expiration date
        </div>

    </div>
);

const mapStateToProps=createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckOut);