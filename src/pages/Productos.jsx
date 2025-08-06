// src/pages/Productos.jsx
import { useEffect, useState } from 'react';
import { getTamales, getBebidas, postTamal, postBebida } from '../services/api';
// import { Table } from '../components/Table';
import { BasicTable } from '../components/Table';


export function Productos() {
  const [productos, setTamales] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  // Para formulario simple
  const [nuevoTamal, setNuevoTamal] = useState({
    nombre: '', descripcion: '',  precio: 0
  });
  const [nuevaBebida, setNuevaBebida] = useState({
    tipo: '', endulzante: '', toppings: '', tamaño: '', precio: 0
  });

  useEffect(() => {
    getTamales().then(setTamales);
    getBebidas().then(setBebidas);
  }, []);

  async function agregarTamal() {
    await postTamal(nuevoTamal);
    const data = await getTamales();
    setTamales(data);
    setNuevoTamal({ nombre: '', descripcion: '',  precio: 0});
  }

  async function agregarBebida() {
    await postBebida(nuevaBebida);
    const data = await getBebidas();
    setBebidas(data);
    setNuevaBebida({ tipo: '', endulzante: '', toppings: '', tamaño: '', precio: 0 });
  }

  return (
    <div>
      <h2>Productos - Tamales</h2>
      <BasicTable
        columns={[
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Descripcion', accessor: 'descripcion' },
          { header: 'Precio', accessor: 'precio' },
        ]}
        data={productos}
      />
      <h3>Agregar Producto</h3>
      <input placeholder="Nombre" value={nuevoTamal.nombre} onChange={e => setNuevoTamal({...nuevoTamal, nombre: e.target.value})} />
      <input placeholder="Descripcion" value={nuevoTamal.descripcion} onChange={e => setNuevoTamal({...nuevoTamal, descripcion: e.target.value})} />
      <input type="number" placeholder="Precio" value={nuevoTamal.precio} onChange={e => setNuevoTamal({...nuevoTamal, precio: parseFloat(e.target.value)})} />
      <button onClick={agregarTamal}>Agregar Tamal</button>

      <h2>Productos - Bebidas</h2>
      <BasicTable
        columns={[
          { header: 'Tipo', accessor: 'tipo' },
          { header: 'Endulzante', accessor: 'endulzante' },
          { header: 'Toppings', accessor: 'toppings' },
          { header: 'Tamaño', accessor: 'tamaño' },
          { header: 'Precio', accessor: 'precio' },
        ]}
        data={bebidas}
      />
      <h3>Agregar Bebida</h3>
      <input placeholder="Tipo" value={nuevaBebida.tipo} onChange={e => setNuevaBebida({...nuevaBebida, tipo: e.target.value})} />
      <input placeholder="Endulzante" value={nuevaBebida.endulzante} onChange={e => setNuevaBebida({...nuevaBebida, endulzante: e.target.value})} />
      <input placeholder="Toppings" value={nuevaBebida.toppings} onChange={e => setNuevaBebida({...nuevaBebida, toppings: e.target.value})} />
      <input placeholder="Tamaño" value={nuevaBebida.tamaño} onChange={e => setNuevaBebida({...nuevaBebida, tamaño: e.target.value})} />
      <input type="number" placeholder="Precio" value={nuevaBebida.precio} onChange={e => setNuevaBebida({...nuevaBebida, precio: parseFloat(e.target.value)})} />
      <button onClick={agregarBebida}>Agregar Bebida</button>
    </div>
  );
}
