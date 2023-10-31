import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/recetas.css'

const baseUrl = "http://localhost:5000"

export default function Recetas() {
    const [listaRecetas, setListaRecetas] = useState([])
    const [receta, setReceta] = useState({
        ingredientes: {},
        preparacion: "",
    })
    const [listaIngredientes, setListaIngredientes] = useState([
        { nombre: "", cantidad: "" }
    ])
    const [preparacion, setPreparacion] = useState("")

    const fetchRecetas = async () => {
        const data = await axios.get(`${baseUrl}/recetas`)
        const { recetas } = data.data
        setListaRecetas(recetas)
        console.log("DATA:", data)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/recetas/${id}`)
            const listaActualizada = listaRecetas.filter(receta => receta.id !== id)
            setListaRecetas(listaActualizada);
        } catch(err) {
            console.error(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Check if there are ingredients before posting
            if (Object.keys(receta.ingredientes).length > 0 || preparacion.trim() !== "") {
                const response = await axios.post(`${baseUrl}/recetas`, {
                ingredientes: receta.ingredientes,
                preparacion: preparacion,
                });
                setListaRecetas([...listaRecetas, response.data])
                console.log("Receta data from server", response.data);

                setListaIngredientes([{ nombre: "", cantidad: "" }]);
                setPreparacion("");
            } else {
                console.log("No ingredients or preparation to submit.");
            }
        } catch (error) {
            console.error("Error posting receta", error)
        }
    }

    const handleChangeInput = (index, event) => {
        const values = [...listaIngredientes]
        values[index][event.target.name] = event.target.value
        setListaIngredientes(values)
 
        console.log("Receta", receta)
    }

    const handleChangeDesc = (e) => {
        setPreparacion(e.target.value)
    }

    const handleAddFields = () => {
        setListaIngredientes([...listaIngredientes, { nombre: '', cantidad: ''}])
    }

    const handleRemoveFields = (index) => {
        const values = [...listaIngredientes]
        values.splice(index, 1)
        setListaIngredientes(values)
    }

    useEffect(() => {
        const updatedReceta = listaIngredientes.reduce((acc, curr) => {
          if (curr.nombre) {
            acc.ingredientes[curr.nombre] = curr.cantidad;
          }
          return acc;
        }, { ingredientes: {} });
    
        setReceta(updatedReceta);
      }, [listaIngredientes]);

    useEffect(() => {
        fetchRecetas();
    }, [])
    
    return(
        <>
            <section className="formulario-receta">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ingrediente">Ingrediente(s)</label>
                        {listaIngredientes.map((ingrediente, index) => (
                            <div key={index}>
                                <input 
                                    placeholder="Nombre"
                                    onChange={event => handleChangeInput(index, event)}
                                    name="nombre"
                                    type="text"
                                    value={ingrediente.nombre}
                                />
                                <input 
                                    placeholder="Cantidad"
                                    onChange={event => handleChangeInput(index, event)}
                                    name="cantidad"
                                    type="number"
                                    min={0}
                                    value={ingrediente.cantidad}
                                />
                                <button type="button" onClick={() => handleAddFields()}>+</button>
                                <button type="button" onClick={() => handleRemoveFields(index)}>-</button>
                            </div>
                        ))}
                        
                    </div>
                    <div className="preparacion">
                        <label>Preparación</label>
                        <textarea maxLength={255} id="preparacion" name="preparacion" value={preparacion} onChange={(e) => handleChangeDesc(e)}></textarea>
                    </div>
                    <button type="submit">Submit Receta</button>
                </form>
            </section>
            <section>
                <ul className="lista-receta">
                    {listaRecetas.map(receta => {
                        return(
                        <li style={{display: "flex"}} key={receta.id}>
                            <ul className="ayuda">
                                {Object.entries(receta.ingredientes).map(([ingrediente, cantidad]) => (
                                    <li key={ingrediente}>{ingrediente}: {cantidad}</li>
                                ))}
                            </ul>
                            {receta.preparacion}
                            <button type="button" onClick={() => handleDelete(receta.id)} className="boton-receta">Eliminar Receta</button>
                        </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}