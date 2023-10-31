import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocalStorage2 } from '../hooks/useLocalStorage2';

const baseUrl = "http://localhost:5000"

export function OrdenModifyInventory() {
  const [listaInsumos, setListaInsumos] = useState([]);
  const [nonRegisteredIngredients, setNonRegisteredIngredients] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [total, setTotal] = useLocalStorage2('total', []); // Use the useLocalStorage2 hook
  const [newInsumosList, setNewInsumosList] = useState([]); // State to store modified insumos

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/insumos`);
        const { insumos } = response.data;
        setListaInsumos(insumos);
        console.log("DATA:", response.data);
      } catch (error) {
        console.error('Error fetching insumos:', error);
      }
    };

    fetchInsumos();
  }, []);

  useEffect(() => {
    if (isButtonPressed && total.length > 0 && listaInsumos.length > 0) {
      const updatedInsumos = listaInsumos.map((insumo) => {
        const matchingIngredient = total.find(
          (ingredient) => ingredient.nombre === insumo.nombre
        );

        if (matchingIngredient) {
          const newCantidad = parseFloat(insumo.cantidad) - parseFloat(matchingIngredient.cantidad);
          // Add the modified insumo to newInsumosList
          setNewInsumosList((prevList) => [...prevList, { ...insumo, cantidad: newCantidad.toString() }]);
          // Return the original insumo with updated cantidad
          return { ...insumo, cantidad: newCantidad.toString() };
        }

        return insumo;
      });

      const nonRegistered = total.filter(
        (ingredient) => !listaInsumos.some((insumo) => insumo.nombre === ingredient.nombre)
      );

      setListaInsumos(updatedInsumos);
      setNonRegisteredIngredients(nonRegistered);
    }
  }, [isButtonPressed, total, listaInsumos]);

  const handleButtonClick = () => {
    setIsButtonPressed(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Trigger Effect</button>
      <h2>Insumos Modificados</h2>
      <ul>
        {/* Map the modified insumos from newInsumosList */}
        {newInsumosList.map((insumo) => (
          <li key={insumo.nombre}>{`${insumo.nombre}: ${insumo.cantidad}`}</li>
        ))}
      </ul>

      {nonRegisteredIngredients.length > 0 && (
        <div>
          <h3>Estos insumos no están registrados en el inventario:</h3>
          <ul>
            {nonRegisteredIngredients.map((ingredient) => (
              <li key={ingredient.nombre}>{`${ingredient.nombre}: ${ingredient.cantidad}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}