import React, {useState, useEffect} from "react";
import ProductJson from './Product.json'

const TarjetaProducto = ({producto}) =>{
  console.log("aa", producto)
   return (
    <div>
        <h3>{producto.name}</h3>
        <p>{producto.description}</p>
        <p>{`$${producto.price}`}</p>
        <p>{`Disponible: ${producto.isAvailable ? "Si" : "No"}`}</p>   
    </div>
   )

}
export default TarjetaProducto;