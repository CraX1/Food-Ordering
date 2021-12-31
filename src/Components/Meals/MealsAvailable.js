import React, { useEffect,useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./MealsAvailable.module.css";

const MealsAvailable = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null)

  useEffect(() => {
    const fetchMeals=async ()=>{
      const response= await fetch('https://fooodmeal-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const data=await response.json();
    
      const loadedMeals=[];
      for(const dataKey in data){
        loadedMeals.push({
          id:dataKey,
          name:data[dataKey].name,
          description:data[dataKey].description,
          price: data[dataKey].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    
    fetchMeals().catch((error)=>{
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
      name={meal.name}
      key={meal.id}
      id={meal.id}
      description={meal.description}
      price={meal.price}
      ></MealItem>
      );
    });
  
    if(isLoading){
      return <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    }
    
    if(httpError){
      return <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    }
    return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;

