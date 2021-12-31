import React from "react";
import mealsImage from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Big Grills</h1>
        <HeaderCartButton cartClickHandler={props.showCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Error" />
      </div>
    </React.Fragment>
  );
};

export default Header;