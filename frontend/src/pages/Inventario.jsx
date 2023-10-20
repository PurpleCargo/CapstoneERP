import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css'
import '../css/inventario.css'

const baseUrl = "http://localhost:5000"

export default function Inventario() {
    const [listaInsumos, setListaInsumos] = useState([])
    const [insumo, setInsumo] = useState({
        nombre: "",
        cantidad: "",
        cantidad_min: "",
    })
    const [editInsumo, setEditInsumo] = useState({
        nombre: "",
        cantidad: "",
        cantidad_min: "",
    })
    const [insumoId, setInsumoId] = useState(null)

    const fetchInsumos = async () => {
        const data = await axios.get(`${baseUrl}/insumos`)
        const { insumos } = data.data
        setListaInsumos(insumos)
        console.log("DATA:", data)
    }

    const handleChange = (e, field) => {
        const {name, value} = e.target;
        if (field === 'edit') {
            setEditInsumo((prev) => {
                return {...prev, [name]: value}
            });
        } else {
            setInsumo((prev) => {
                return {...prev, [name]: value}
            });
        }
    }

    console.log(insumo)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/insumos/${id}`)
            const listaActualizada = listaInsumos.filter(insumo => insumo.id !== id)
            setListaInsumos(listaActualizada);
        } catch(err) {
            console.error(err.message)
        }
    }

    const toggleEdit = (insumo) => {
        setInsumoId(insumo.id)
        setEditInsumo(insumo.nombre, insumo.cantidad, insumo.cantidad_min)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(insumo)
        try {
            if (editInsumo.nombre) {
                const data = await axios.put(`${baseUrl}/insumos/${insumoId}`, editInsumo)
                const updatedInsumo = data.data.insumo
                const listaActualizada = listaInsumos.map(insumo => {
                    if (insumo.id === insumoId) {
                        return insumo = updatedInsumo
                    }
                    return insumo
                })
                setListaInsumos(listaActualizada)
            } else {
                const data = await axios.post(`${baseUrl}/insumos`, insumo)
                setListaInsumos([...listaInsumos, data.data]);
            }
            setInsumo({
                nombre: "",
                cantidad: "",
                cantidad_min: "",
            });
            setEditInsumo({
                nombre: "",
                cantidad: "",
                cantidad_min: "",
            })
            setInsumoId(null)
        } catch (err) {
            console.error(err.message);
            console.error(err.response.data)
        }
    }

    useEffect(() => {
        fetchInsumos();
    }, [])

    return (
        <div className='inventario'>
            <section>
                <form onSubmit={handleSubmit} className='formulario'>
                    <label htmlFor='nombre'>Nombre insumo</label>
                    <input
                        onChange={(e) => handleChange(e, 'postear')}
                        type='text'
                        name='nombre'
                        id='nombre'
                        value={insumo.nombre}
                    />
                    <label htmlFor='cantidad'>Cantidad Actual</label>
                    <input
                        onChange={(e) => handleChange(e, 'postear')}
                        type='number'
                        min={0}
                        name='cantidad'
                        id='cantidad'
                        value={insumo.cantidad}
                    />
                    <label htmlFor='cantidad_min'>Cantidad Mínima</label>
                    <input
                        onChange={(e) => handleChange(e, 'postear')}
                        type='number'
                        min={0}
                        name='cantidad_min'
                        id='cantidad_min'
                        value={insumo.cantidad_min}
                    />
                    <button className='boton' type="submit">Submit</button>
                </form>
            </section>
            <section>
                <ul className='lista'>
                    {listaInsumos.map(insumo => {
                        if (insumoId === insumo.id) {
                            return (
                                <li>
                                    <form onSubmit={handleSubmit} key={insumo.id}>
                                        <input
                                            onChange={(e) => handleChange(e, 'edit')}
                                            type='text'
                                            name='nombre'
                                            id='nombre'
                                            value={editInsumo.nombre}
                                        />
                                        <input
                                            onChange={(e) => handleChange(e, 'edit')}
                                            type='number'
                                            min={0}
                                            name='cantidad'
                                            id='cantidad'
                                            value={editInsumo.cantidad}
                                        />
                                        <input
                                            onChange={(e) => handleChange(e, 'edit')}
                                            type='number'
                                            min={0}
                                            name='cantidad_min'
                                            id='cantidad_min'
                                            value={editInsumo.cantidad_min}
                                        />
                                        <button className='boton' type='submit'>Submit</button>
                                    </form>
                                </li>
                            )
                        } else {
                            return (
                                <li style={{display: "flex"}} key={insumo.id}>
                                    {insumo.nombre}
                                    <button onClick={() => toggleEdit(insumo)} className='boton'>Edit</button>
                                    <button onClick={() => handleDelete(insumo.id)} className='boton'>X</button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </section>
        </div>
    )
}
