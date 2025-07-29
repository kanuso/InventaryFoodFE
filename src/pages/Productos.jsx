// src/pages/Productos.jsx
import { useEffect, useState } from 'react';
import { getTamales, getBebidas, postTamal, postBebida } from '../services/api';
import { Table } from '../components/Table';

export function Productos() {
  const [tamales, setTamales] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  // Para formulario simple
  const [nuevoTamal, setNuevoTamal] = useState({
    tipoMasa: '', relleno: '', envoltura: '', nivelPicante: '', precioUnitario: 0
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
    setNuevoTamal({ tipoMasa: '', relleno: '', envoltura: '', nivelPicante: '', precioUnitario: 0 });
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
      <Table
        columns={[
          { header: 'Tipo Masa', accessor: 'tipoMasa' },
          { header: 'Relleno', accessor: 'relleno' },
          { header: 'Envoltura', accessor: 'envoltura' },
          { header: 'Nivel Picante', accessor: 'nivelPicante' },
          { header: 'Precio Unitario', accessor: 'precioUnitario' },
        ]}
        data={tamales}
      />
      <h3>Agregar Tamal</h3>
      <input placeholder="Tipo Masa" value={nuevoTamal.tipoMasa} onChange={e => setNuevoTamal({...nuevoTamal, tipoMasa: e.target.value})} />
      <input placeholder="Relleno" value={nuevoTamal.relleno} onChange={e => setNuevoTamal({...nuevoTamal, relleno: e.target.value})} />
      <input placeholder="Envoltura" value={nuevoTamal.envoltura} onChange={e => setNuevoTamal({...nuevoTamal, envoltura: e.target.value})} />
      <input placeholder="Nivel Picante" value={nuevoTamal.nivelPicante} onChange={e => setNuevoTamal({...nuevoTamal, nivelPicante: e.target.value})} />
      <input type="number" placeholder="Precio Unitario" value={nuevoTamal.precioUnitario} onChange={e => setNuevoTamal({...nuevoTamal, precioUnitario: parseFloat(e.target.value)})} />
      <button onClick={agregarTamal}>Agregar Tamal</button>

      <h2>Productos - Bebidas</h2>
      <Table
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
