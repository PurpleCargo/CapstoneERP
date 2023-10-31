import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/alerta.css'

const baseUrl = "http://localhost:5000"

export default function Alerta() {
    const [listaInsumos, setListaInsumos] = useState([])

    const fetchInsumos = async () => {
        const data = await axios.get(`${baseUrl}/insumos`)
        const { insumos } = data.data
        setListaInsumos(insumos)
        console.log("DATA:", data)
    }

    useEffect(() => {
        fetchInsumos()
    }, [])
    return(
        <div className="alerta">
            <h1>Alertas</h1>
            <ul>
                {listaInsumos.map(insumo => {
                    if (insumo.cantidad < insumo.cantidad_min) {
                        return (
                            <div>
                                <p>Nombre</p>
                                <li>{insumo.nombre}</li>
                                <p>Cantidad</p>
                                <li>{insumo.cantidad}</li>
                            </div>
                        )
                    } else {
                        return (null)
                    }
                })}
            </ul>
        </div>
    )
}