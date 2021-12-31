import React, { useContext, useState } from "react";
import CartContext from "../../Store/Cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout.js";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setHasOrdered(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://fooodmeal-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while submitting!");
      }
    } catch (error) {
      setIsSubmitting(false);
      setHttpError(error.message);
    }
    cartCtx.clearCart();
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            name={item.name}
            price={item.price}
            amount={item.amount}
            id={item.id}
            key={item.id}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const orderAction = (
    <div className={classes.actions}>
      <button onClick={props.hideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {hasOrdered && (
        <Checkout
          onSubmitOrder={submitOrderHandler}
          onCancel={props.hideCart}
        />
      )}
      {!hasOrdered && orderAction}
     
    </React.Fragment>
  );

  const submittingData = <p>Sending order data...</p>;
  const orderSubmitted = (
    <React.Fragment>

      <p>Your order has been placed successfully!</p> 
      <div className={classes.actions}>
      <button onClick={props.hideCart} className={classes["button--alt"]}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  const errorMessage= <React.Fragment>
    <p>{httpError}</p>
    <div className={classes.actions}>
      <button onClick={props.hideCart} className={classes["button--alt"]}>
        Close
      </button>
    </div>
  </React.Fragment>
  
  return (
    <Modal onBgClick={props.hideCart}>
      {!isSubmitting && !submitted && modalContent}
      {isSubmitting && submittingData}
      {!isSubmitting && submitted && !httpError && orderSubmitted}
      {httpError && errorMessage}
    </Modal>
  );
};
export default Cart;
