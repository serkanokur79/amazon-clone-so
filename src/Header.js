import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Badge from '@material-ui/core/Badge';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='amazon logo'
        />
      </Link>

      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div>
      <div className='header__nav'>
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className='header__option'>
            <span className='header__optionLineOne'>
              Hello {user ? user.email : 'guest'}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'> Returns</span>
            <span className='header__optionLineTwo'> &Orders</span>
          </div>
        </Link>
        <div className='header__option'>
          <span className='header__optionLineOne'> Your</span>
          <span className='header__optionLineTwo'> Prime</span>
        </div>
        <Link to='/checkout'>
          <div className='header__optionBasket'>
            <Badge
              badgeContent={basket.length > 0 ? basket.length : null}
              color='primary'
            >
              <ShoppingCartSharpIcon />
            </Badge>
            <span className='header__optionLineTwo header__basketCount'>
              Cart
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
