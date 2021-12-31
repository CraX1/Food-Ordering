import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealForm.module.css";
const MealForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid,setAmountIsValid]= useState(true)

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const inputAmount = amountInputRef.current.value;
    

    const inputAmountNumber = +inputAmount; 
    if(inputAmount.trim().length===0 || inputAmountNumber<1 || inputAmountNumber>5){
        setAmountIsValid(false)
        return;
    }

    props.onAddToCart(inputAmountNumber)
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref= { amountInputRef }
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealForm;