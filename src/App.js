import React from "react";
import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";


let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.ui.isVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    if (isInitial === true) {
      isInitial = false;
      return;
    }
    const fetchData = async () => {
      dispatch(uiActions.showNotification({
        sttaus: "pending",
        title: "Sending..",
        message: "Sending cart data",
      })
      );
      const res = await fetch(`https://recipe-seacrh.firebaseio.com/cart.json`, {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      if (!res.ok) {
        throw new Error('Sending cart data failed!');
      }
      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success..",
        message: "Sent successfully",
      }));
    }
    fetchData().catch(err => {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      }));
    });
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
