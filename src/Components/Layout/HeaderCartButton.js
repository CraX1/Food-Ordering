import React, { useContext, useState, useEffect } from "react";
import CarIcon from "./CarIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/Cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  } `;
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer=setTimeout(()=>{
        setBtnIsHighlighted(false)
    },300);
    return ()=>{
        clearTimeout(timer);
    }

  }, [items]);

  const noOfItem = cartCtx.items.reduce((currentNo, item) => {
    return currentNo + item.amount;
  }, 0);

  return (
    <button onClick={props.cartClickHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CarIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItem}</span>
    </button>
  );
};

export default HeaderCartButton;
