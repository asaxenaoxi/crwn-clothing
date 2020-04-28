import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>
{
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_05Q06s8meUxafLD69wBEaVAP00uAgJvtKv";

    const onToken = (token) =>
    {
        console.log(token);
        alert("Payment Successful")
    }

    return(
        <div className>
            <StripeCheckout
                label="Pay Now"
                name="CRWN Clothing Ltd. - Ankur Saxena"
                amount={priceForStripe}
                billingAddress
                shippingAddress
                image="https://sendeyo.com/up/d/f3eb2117da"
                description={`You total is $${price}`}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>
    );
}

export default StripeCheckoutButton;