import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const is5Chars = (value) => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const inputName = inputNameRef.current.value;
    const inputStreet = inputStreetRef.current.value;
    const inputPostal = inputPostalRef.current.value;
    const inputCity = inputCityRef.current.value;

    const inputNameIsValid = !isEmpty(inputName);
    const inputStreetIsValid = !isEmpty(inputStreet);
    const inputPostalIsValid = is5Chars(inputPostal);
    const inputCityIsValid = !isEmpty(inputCity);

    setFormInputValidity({
      name: inputNameIsValid,
      street: inputStreetIsValid,
      city: inputCityIsValid,
      postalCode: inputPostalIsValid,
    });

    const formIsValid =
      inputNameIsValid &&
      inputStreetIsValid &&
      inputPostalIsValid &&
      inputCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmitOrder({
        name:inputName,
        street:inputStreet,
        postalCode:inputPostal,
        city:inputCity
    })
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} />
        {!formInputValidity.name && <p>Enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} />
        {!formInputValidity.street && <p>Enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalRef} />
        {!formInputValidity.postalCode && <p>Enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} />
        {!formInputValidity.city && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
