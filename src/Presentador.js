import React, { useEffect, useState } from "react";
import axios from 'axios';

let personas_endpoint = process.env.REACT_APP_PERSONAS_ENDPOINT;

function Presentador() {
  let [personas, setPersonas] = useState([]);

  useEffect(() => {
    axios.get(personas_endpoint)
    .then((response) => {
      setPersonas(response.data)})}
 , []);

  return (
    <div className="Presentador">
      <ul>
        {personas.map(item => {
          return <li>{item.id} - {item.nombre} - {item.fechaNacimiento}</li>;
        })}
      </ul>
    </div>
  );
}

export default Presentador;