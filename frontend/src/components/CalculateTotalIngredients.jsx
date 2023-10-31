import { useShoppingCart } from "../context/ShoppingCartContext";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import { useLocalStorage2 } from "../hooks/useLocalStorage2";

const calculateIngredients = (list) => {
    const newTotal = {};
    list.forEach((item) => {
      const { receta, quantity } = item;
      console.log("Receta, quantity:", { receta, quantity })
      const { ingredientes } = receta;
  
      // Add a check to ensure ingredientes is defined
      if (ingredientes) {
        Object.entries(ingredientes).forEach(([nombre, cantidad]) => {
          if (newTotal[nombre]) {
            newTotal[nombre] += cantidad * quantity;
          } else {
            newTotal[nombre] = cantidad * quantity;
          }
        });
      }
    });
    console.log("newTotal:", newTotal)
    return newTotal;
  };

export default function CalculateTotalIngredients() {
    const { ingredientsList, setIngredientsList } = useShoppingCart();
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [total, setTotal] = useLocalStorage2("total", [])
  
    useEffect(() => {
        const calculateTotal = async () => {
          const resolvedIngredientsList = await Promise.all(
            ingredientsList.map(async (item) => {
              const { receta, quantity } = item;
              const resolvedReceta = await receta; // Wait for the promise to resolve
              return { receta: resolvedReceta, quantity };
            })
          );
      
          console.log('Resolved Ingredients List:', resolvedIngredientsList);
      
          // Check if setTotal is a function before proceeding
          // Check if ingredientsList is defined before proceeding
          if (typeof setTotal === 'function') {
            // Now you have the resolved data, you can proceed with the calculations
            console.log('Setting total:', calculateIngredients(resolvedIngredientsList));
            setTotal(calculateIngredients(resolvedIngredientsList));
            console.log('Total set:', total); // Note: this might still log the old value due to closure
            //setIngredientsList([]);
            setIsButtonPressed(false);
          }
        };
      
        if (isButtonPressed) {
          calculateTotal();
        }
      }, [ingredientsList, isButtonPressed, setIngredientsList, setTotal]);
  
    const handleCalculateTotal = () => {
      setIsButtonPressed(true);
    };
  
    return (
      <div>
        <Button onClick={handleCalculateTotal} variant='outlined' color='success'>
          Calculate Total
        </Button>
        {/* Render or use 'total' as needed */}
        {total && Object.entries(total).map(([ingredient, quantity]) => (
            <div key={ingredient}>{`${ingredient}: ${quantity}`}</div>
        ))}
      </div>
    );
}