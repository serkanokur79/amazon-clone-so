import React from 'react';
import './Home.css';
import Product from './Product';
function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://images-na.ssl-images-amazon.com/images/G/01/Audible/en_US/images/creative/amazon/Minerva_Gateway_Hero_Desktop_070820_PremiumPlus_1x._CB410855810_.jpg'
          alt=''
        />
        <div className='home__row'>
          <Product
            id='12321341'
            title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback'
            image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg'
            price='11.96'
            rating={5}
          />
          <Product
            id='45465461'
            title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl'
            image='https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg'
            price='239'
            rating={4}
          />
        </div>
        <div className='home__row'>
          <Product
            id='14854811'
            title='Samsung LC49RG90SSUXEN 49" Curved LED Gaming Monitor'
            image='https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'
            price='199.99'
            rating={3}
          />
          <Product
            id='454541811'
            title='Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric'
            image='https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$'
            price='98.99'
            rating={5}
          />
          <Product
            id='8784541811'
            title='New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)'
            image='https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg'
            price='598.99'
            rating={4}
          />
        </div>
        <div className='home__row'>
          <Product
            id='5454541811'
            title='Samsung LC49RG90SSUXEN 49" Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440'
            image='https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
            price='1094.98'
            rating={4}
          />
        </div>
        <div className='home__row'>{/*Product */}</div>
      </div>
    </div>
  );
}

export default Home;
