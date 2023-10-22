import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5000"

export default function Recetas() {
    const [listaRecetas, setListaRecetas] = useState([])
    const [receta, setReceta] = useState({
        ingredientes: {},
        preparacion: "",
    })
    const [listaIngredientes, setListaIngredientes] = useState([])

    const fetchRecetas = async () => {
        const data = await axios.get(`${baseUrl}/recetas`)
        const { recetas } = data.data
        setListaRecetas(recetas)
        console.log("DATA:", data)
    }
 
    useEffect(() => {
        fetchRecetas();
    }, [])

    
    return(
        <>
            <section>
                <ul>
                    {listaRecetas.map(receta => {
                        return(
                        <li style={{display: "flex"}} key={receta.id}>
                            <ul>
                                {listaIngredientes.map(ingrediente => {
                                    return(
                                        <li key={ingrediente.ingrediente}>{ingrediente.ingrediente}</li>
                                    )
                                })}
                            </ul>
                            {receta.preparacion}
                        </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}