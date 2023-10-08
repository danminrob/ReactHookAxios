import React, { useEffect, useState } from "react";
import axios from 'axios';

const personas_id_endpoint = process.env.REACT_APP_PERSONAS_ID_ENDPOINT;
const personas_nombre_endpoint = process.env.REACT_APP_PERSONAS_NOMBRE_ENDPOINT;;

function armarFiltrosPeticion(id, nombre) {
  let filtros = {id, nombre}
  console.log(filtros.nombre)
  if (filtros.id !== undefined || filtros.nombre !== undefined) {
    let cadenaFiltros = "?"
    if (filtros.id !== undefined) {
      cadenaFiltros += "id=" + filtros.id + "&"
    }
    if (filtros.nombre !== undefined) {
      cadenaFiltros += "nombre=" + filtros.nombre + "&"
    }
    return cadenaFiltros;
  }
  return ""
}

function Filtro() {
  let [catalogoIds, setCatalogoIds] = useState([])
  let [catalogoNombres, setCatalogoNombres] = useState([])
  let [id, setId] = useState()
  let [nombre, setNombre] = useState()

  useEffect(() => {
    let cadenaFiltros = armarFiltrosPeticion(id, nombre)
    axios.get(personas_id_endpoint + cadenaFiltros)
    .then((response) => {
      setCatalogoIds(response.data)})}
 , [nombre]);

 useEffect(() => {
    let cadenaFiltros = armarFiltrosPeticion(id, nombre)
    axios.get(personas_nombre_endpoint + cadenaFiltros)
    .then((response) => {
    setCatalogoNombres(response.data)})}
, [id]);

  return (
    <div className="Filtro">
      <select onChange={e => setId(e.target.value)}
        value={catalogoIds}>
        <option value="">Select the IDs</option>
        {catalogoIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      
      <select onChange={e => setNombre(e.target.value)}
        value={catalogoNombres}>
        <option value="">Select the Nombres</option>
        {catalogoNombres.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;