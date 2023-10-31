import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useShoppingCart } from '../context/ShoppingCartContext'

export function RestockItem({ id, ingredientes }) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)

    return <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Typography sx={{ mb: '4px' }}>
                <span>producto: {id}</span>
            </Typography>
            <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {Object.entries(ingredientes).map(([nombre, cantidad]) => (
                    <div key={nombre}>
                        {nombre}: {cantidad}
                    </div>
                ))}
            </Typography>
            <div style={{ marginTop: 'auto' }}>
                {quantity === 0 ? (
                    <Button onClick={() => increaseCartQuantity(id)} sx={{ width: 1 }} variant='outlined'>+ Agregar a orden</Button>
                ) : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                            <Button onClick={() => decreaseCartQuantity(id)} variant='outlined' size='small'>-</Button>
                            <div>
                                <span>{quantity}</span> en orden
                            </div>
                            <Button onClick={() => increaseCartQuantity(id)} variant='outlined' size='small'>+</Button>
                        </div>
                        <Button onClick={() => removeFromCart(id)} size='small' variant='outlined' color='warning'>Eliminar</Button>
                    </div>}
            </div>
        </CardContent>
    </Card>
}