import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ key, id, image, title, price, rating, hidebutton }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //remove the item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
    console.log('removed');
  };

  return (
    <div key={key} className='checkoutProduct'>
      <img src={image} alt='' className='checkoutProduct__image' />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>{' '}
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
        {!hidebutton && (
          <button onClick={removeFromBasket}> Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
