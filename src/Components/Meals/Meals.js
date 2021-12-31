import React from "react";
import MealsAvailable from "./MealsAvailable";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <MealsAvailable />
    </React.Fragment>
  );
};

export default Meals;
