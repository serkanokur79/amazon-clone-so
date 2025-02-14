import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer for
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currecies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log('THE SECRET is >>>', clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent =  payment confirmation
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: 'EMPTY_BASKET' });

        history.replace('/orders');
      });
  };

  const handleChange = (event) => {
    // listen for changes in CardElement
    // and display any errors as the custome types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (
          <Link to='/checkout'>
            {basket.length}
            items
          </Link>
          )
        </h1>
        {/* Payment section - address  */}{' '}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3> Delivery Address </h3>
          </div>
          <div className='payment__address'>
            <p> {user?.email} </p>
            <p> 123 React Lane </p>
            <p> Los Angeles, CA </p>
          </div>
        </div>
        {/* Payment section - review items  */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3> Review Items and Delivery </h3>
          </div>
          <div className='payment__items'>
            {' '}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment section - payment method  */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3> Payment method </h3>
          </div>
          <div className='payment__details'>
            {/* stripe*/}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payments__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3> Order Total: {value} </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeperator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p> Processing </p> : 'Buy Now'}</span>
                </button>
              </div>
              {/*Errors */}
              {error && <div> error </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
