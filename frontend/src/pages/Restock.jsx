import axios from "axios";
import React, { useState, useEffect } from "react";
import '../css/restock.css'

const baseUrl = "http://localhost:5000"

export default function Restock() {
    const [listaRecetas, setListaRecetas] = useState([])

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
        </>
    )
}