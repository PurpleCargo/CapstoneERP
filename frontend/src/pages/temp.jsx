
const handleSubmitIngredients = () => {
    set
}

<button onClick={() => handleSubmitIngredients()}>Submit Ingredientes</button>

const updatedReceta = {
    ...receta,
    ingredientes: {
        ...receta.ingredientes,
        [values[index].nombre]: values[index].cantidad,
    }
}
setReceta(updatedReceta)

const [tempIngredientes, setTempIngredientes] = useState({})

setReceta({
    ...receta,
    ingredientes: tempIngredientes,
    preparacion: preparacion, 
})


setTempIngredientes({})

setTempIngredientes({
    ...tempIngredientes,
    [values[index].nombre]: values[index].cantidad,
})

const tempValues = { ...tempIngredientes };
delete tempValues[values[index].nombre];
setTempIngredientes(tempValues)

useEffect(() => {
    // Update the receta state when listaIngredientes or preparacion changes
    setReceta({
      ...receta,
      ingredientes: tempIngredientes,
      preparacion: preparacion,
    });
  }, [listaIngredientes, preparacion, tempIngredientes]);

  <>
  <div className='mt-auto'>
    {quantity === 0 ? (
        <Button className='w-100'>+ Add to cart</Button>
    ) : <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem'}}>
            <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem'}}>
                Hi
            </div>
            Bye
        </div>}
    </div>
            <section>
                <ul className="lista-restock">
                    {listaRecetas.map(receta => {
                        return(
                        <li style={{display: "flex"}} key={receta.id}>
                            <ul className="ayuda-restock">
                                {Object.entries(receta.ingredientes).map(([ingrediente, cantidad]) => (
                                    <li key={ingrediente}>{ingrediente}: {cantidad}</li>
                                ))}
                            </ul>
                            {receta.preparacion}
                            <button type="button">+</button>
                            <button type="button">-</button>
                        </li>
                        )
                    })}
                </ul>
            </section>

            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>

        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <div className="me-auto">
                <div>
                    {item.name}{" "}{quantity > 1 && <span className="text-muted" style={{ fontSize: '0.65rem' }}>{quantity}x</span>}
                </div>
            </div>
        </Stack>

        </>
const normalizedIngredientes = ingredientes
? { [ingredientes.nombre]: ingredientes.cantidad }
: {};


{
    "recetas": [
        {
            "id": 1,
            "ingredientes": {
                "azucar": "0.8",
                "harina": "1.4"
            },
            "preparacion": "dsadsadsadsad"
        },
        {
            "id": 2,
            "ingredientes": {
                "azucar": "0.3",
                "harina": "1.2",
                "huevos": "0.8"
            },
            "preparacion": "test2"
        }
    ]
}

function increaseCartQuantity(id) {
    setCartItems(currItems => {
        if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
        } else {
            return currItems.map(item => {
                if (item.id === id) {
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        }
    })
}

function increaseCartQuantity(id) {
    setCartItems(currItems => {
        const existingItem = currItems.find(item => item.id === id);

        if (!existingItem) {
            // If item is not in cart, fetch and add the complete receta object
            const newReceta = fetchRecetaById(id);
            return [...currItems, { id, quantity: 1, receta: newReceta }];
        } else {
            // If item is already in cart, update quantity
            return currItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
        }
    });
}

function increaseCartQuantity(id) {
    setCartItems(async (currItems) => {
        const existingItem = currItems.find((item) => item.id === id);

        if (!existingItem) {
            // If item is not in cart, fetch and add the complete receta object
            const newReceta = await fetchRecetaById(id);
            return [...currItems, { id, quantity: 1, receta: newReceta }];
        } else {
            // If item is already in cart, update quantity
            const updatedItems = await Promise.all(
                currItems.map(async (item) => {
                    if (item.id === id) {
                        const newQuantity = item.quantity + 1;
                        const newReceta = await fetchRecetaById(id);
                        return { ...item, quantity: newQuantity, receta: newReceta };
                    } else {
                        return item;
                    }
                })
            );
            return updatedItems;
        }
    });
}

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems } = useShoppingCart()

    const calculateTotalIngredients = () => {
        const ingredientTotals = {};
    
        cartItems.forEach((item, index) => {
          const { ingredientes = {} } = item;

          console.log(`Processing cart item ${index + 1}:`, item)
          
          Object.entries(ingredientes).forEach(([ingredientName, quantity]) => {
            ingredientTotals[ingredientName] = (ingredientTotals[ingredientName] || 0) + (parseInt(quantity) || 0);
          });
        });
    
        console.log('Ingredient Totals:', ingredientTotals)
        return ingredientTotals;
    };
    
    const totalIngredients = calculateTotalIngredients();

    console.log('Total ingredients:', totalIngredients)

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
                    <div className="ms-auto fw-bold fs-5">
                        Total Ingredients:
                        {Object.entries(totalIngredients).map(([ingredientName, totalQuantity]) => (
                        <div key={ingredientName}>
                            {`${ingredientName}: ${totalQuantity}`}
                        </div>
                        ))}
                    </div>
                </Stack>
            </div>
        </Drawer>
    )
}
