import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { OrdenModifyInventory } from "./OrdenModifyInventory";
import CalculateTotalIngredients from "./CalculateTotalIngredients";

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems, ingredientsList, setIngredientsList } = useShoppingCart()
    
    return (   
        <Drawer anchor="right" open={isOpen} onClose={closeCart}>
            <div style={{ width: '250px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={closeCart}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="h6" gutterBottom>
                    Cart
                </Typography>
                <Stack spacing={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </Stack>
                <div>
                    <CalculateTotalIngredients />
                </div>
                <div>
                    <OrdenModifyInventory />
                </div>
            </div>
        </Drawer>
    )
}