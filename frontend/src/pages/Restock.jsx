import axios from "axios";
import React, { useState, useEffect } from "react";
import '../css/restock.css'
import Grid from '@mui/material/Grid'
import { RestockItem } from "../components/RestockItem";

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
            <h1>Restock</h1>
            <Grid container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12 }}>
                {listaRecetas.map(receta => (
                    <Grid item key={receta.id} xs={2} sm={4} md={4}>
                        <RestockItem id={receta.id} ingredientes={receta.ingredientes} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}