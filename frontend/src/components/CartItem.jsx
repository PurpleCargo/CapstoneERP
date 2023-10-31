import { useShoppingCart } from "../context/ShoppingCartContext";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

const baseUrl = "http://localhost:5000"

export function CartItem({ id, quantity }) {
    const [receta, setReceta] = useState(null)
    const { removeFromCart } = useShoppingCart()
    
    useEffect(() => {
        const fetchReceta = async () => {
          try {
            const response = await axios.get(`${baseUrl}/recetas/${id}`);
            setReceta(response.data.receta);
          } catch (error) {
            console.error('Error fetching receta:', error);
          }
        };
    
        fetchReceta();
    }, [id]);

    if (!receta) return null;

    const { ingredientes = {}, preparacion } = receta;

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <div>
                {Object.entries(ingredientes).map(([nombre, cantidad]) => (
                    <Typography key={nombre} variant="body2" color="textSecondary">
                        {`${nombre}: ${cantidad * quantity}`}
                    </Typography>
                ))}
            </div>
            <div className="me-auto">
                <div>
                    <Typography variant="body1">{`Producto: ${id}`}</Typography>
                    {quantity > 1 && (
                        <Typography variant="body2" color="textSecondary">
                            {`(x${quantity})`}
                        </Typography>
                    )}
                </div>
            </div>
            <Button variant='outlined' size='small' onClick={() => removeFromCart(id)}>&times;</Button>
        </Stack>
    )
}