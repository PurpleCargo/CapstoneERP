import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import axios from "axios";
import { useLocalStorage } from './../hooks/useLocalStorage';

const baseUrl = "http://localhost:5000"

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
    const [ingredientsList, setIngredientsList] = useState([]);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const fetchRecetaById = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/recetas/${id}`);
            return response.data.receta;
        } catch (error) {
            console.error('Error fetching receta:', error);
            return null; // or handle the error as needed
        }
    };

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    } 

    function increaseCartQuantity(id) {
        setCartItems((currItems) => {
          const existingItem = currItems.find((item) => item.id === id);
      
          if (!existingItem) {
            const newReceta = fetchRecetaById(id);
            console.log('Adding to cart:', { id, quantity: 1, receta: newReceta });
            const newItem = { id, quantity: 1, receta: newReceta };
            //console.log('Adding to cart:', newItem);
            setIngredientsList([...ingredientsList, newItem]);
            console.log('Ingredients List:', [...ingredientsList, newItem]);
            return [...currItems, newItem];
          } else {
            // If item is already in cart, update quantity
            const updatedItems = currItems.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
              } else {
                return item;
              }
            });
      
            console.log('Updating cart:', updatedItems);
            setIngredientsList(updatedItems);
            console.log('Ingredients List:', updatedItems);
            return updatedItems;
          }
        });
      }      


    function decreaseCartQuantity(id) {
      setCartItems((currItems) => {
        const existingItem = currItems.find((item) => item.id === id);

        if (existingItem && existingItem.quantity > 1) {
          // If item is already in cart and quantity is greater than 1, update quantity
          const updatedItems = currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });

          console.log('Updating cart:', updatedItems);
          setIngredientsList(updatedItems); // Update ingredientsList for decrease action
          console.log('Ingredients List:', updatedItems);
          return updatedItems;
        } else {
          // If item is already in cart and quantity is 1, remove the item
          const updatedItems = currItems.filter((item) => item.id !== id);
          setIngredientsList(updatedItems); // Update ingredientsList for removal action
          return updatedItems;
        }
      });
    }

    function removeFromCart(id) {
      setCartItems((currItems) => {
        const removedItem = currItems.find((item) => item.id === id);
        setIngredientsList((prevList) =>
          prevList.filter((item) => item.id !== id)
        ); // Remove item from ingredientsList
        return currItems.filter((item) => item.id !== id);
      });
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity, ingredientsList,
        setIngredientsList, }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}
  