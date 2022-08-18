import React from "react";
import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.ui.isVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);


  useEffect(() => {
    if (isInitial === true) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);


  return (
    <React.Fragment>
      {notification && (<Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />)}
      <Layout>
        {isVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
