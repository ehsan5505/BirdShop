import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

// const StripeCheckoutButton = ({ price }) => {
//   const priceForStripe = price * 100;
//   const publishableKey = 'pk_test_E72jCY4vZP03CWKPvVpzhH7U00dyLaPLTA';

//   const onToken = token => {
//     console.log(token);
//     alert('Payment Succesful!');
//   };

//   return (
//     <StripeCheckout
//       label='Pay Now'
//       name='CRWN Clothing Ltd.'
//       billingAddress
//       shippingAddress
//       image='https://svgshare.com/i/CUz.svg'
//       description={`Your total is $${price}`}
//       amount={priceForStripe}
//       currency="PKR"
//       panelLabel='Pay Now'
//       token={onToken}
//       stripeKey={publishableKey}
//     />
//   );
// };

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const apiKey = "pk_test_E72jCY4vZP03CWKPvVpzhH7U00dyLaPLTA";

    const onTokenProcess = token => {
        console.info(token);
        alert("Payment is process");
    }

    return (
        <StripeCheckout 
            label="Pay Now!"
            name="Elite Bird Shop"
            billingAddress
            shippingAddress
            currency="PKR"
            locale="en"
            // image="`{'../../assets/elite.svg'}`"
            // image='${../../assets/elite.svg}'
            panelLabe="Process the Payment"
            amount={priceForStripe}
            stripeKey={apiKey}
            description={`Your Total Payment is Rs.${price}`}
            token={onTokenProcess}

        />
    )
}


export default StripeCheckoutButton;