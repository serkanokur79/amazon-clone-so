import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(basket);

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt=''
        />
        <div className='checkout__itemList'>
          {user ? <h3>Hello,{user?.email}</h3> : null}
          <h2 className='checkout__title'>Your Shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item, i) => (
              <FlipMove>
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              </FlipMove>
            ))
          ) : (
            <>
              <p>You have no items in your basket. </p>
              <p>
                To buy one or more items, click "Add to basket" below to the
                item.
              </p>
            </>
          )}
        </div>
      </div>
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
