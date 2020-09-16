import React from 'react';
import { useStateValue } from './StateProvider';
import './Bought.css';
function Bought() {
  const [{ basket }, dispatch] = useStateValue();
  const bought = basket.map((item, i) => {
    const { title, price, image, rating } = item;
    return (
      <div className='bought__box' key={i}>
        <div className='bought__image'>
          <img src={image} clasName='bought__img' alt='' />
        </div>
        <div className='bought__info'>
          <div className='bought__title'>{title}</div>
          <div className='bought__price'>${price} </div>
          <div className='bought__rating'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐️</p>
              ))}
          </div>
          <button>Remove from Basket</button>
        </div>
      </div>
    );
  });
  return <div className='bought'>{bought}</div>;
}

export default Bought;
