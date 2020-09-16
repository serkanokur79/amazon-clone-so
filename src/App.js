import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Payment from './Payment';
import Login from './Login';
import Orders from './Orders';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// listener who is authenticated
const promise = loadStripe(
  'pk_test_51HPvUCKqH3E01gxjQlTylrvf7qtXi23W5sjj4LGYp5fiddoxMCs13gaLhpdBlWHlSyflKnc6rYkLUveEkJ9ThLNJ00FUOJ9wZ1'
);
function App() {
  const [{ basket, user }, dispatch] = useStateValue(); // it will load once when the component loads

  // listener who is authenticated
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('The user is ', authUser);
      if (authUser) {
        //the user just logged in or was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []); // it will only run once when the app component loads...

  return (
    //BEM
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
