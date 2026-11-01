import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TarjetaProducto from './TarjetaProducto'
import productos from './Product.json'

function App() {
  
return (
    <div>
      {productos.map((p) => (
        <TarjetaProducto
          key={p.name}
          producto={p}
        />
      ))}
    </div>
  )
}

export default App
