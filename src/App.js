import React, { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartVisiblity, setCartVisbility] = useState(null);

  const showCartHandler = () => {
    setCartVisbility(true);
  };
  const hideCartHandler = () => {
    setCartVisbility(false);
  };
  return (
    <CartProvider>
      {cartVisiblity && <Cart hideCart={hideCartHandler} />}
      <Header showCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
