// src/pages/Combos.jsx
import { useEffect, useState } from 'react';
import { getCombos, postCombo } from '../services/api';
import { Table } from '../components/Table';

export function Combos() {
  const [combos, setCombos] = useState([]);
  const [nuevoCombo, setNuevoCombo] = useState({
    nombre: '',
    descripcion: '',
    esEstacional: false,
    precio: 0,
  });

  useEffect(() => {
    getCombos().then(setCombos);
  }, []);

  async function agregarCombo() {
    await postCombo(nuevoCombo);
    const data = await getCombos();
    setCombos(data);
    setNuevoCombo({ nombre: '', descripcion: '', esEstacional: false, precio: 0 });
  }

  return (
    <div>
      <h2>Combos</h2>
      <Table
        columns={[
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Descripcion', accessor: 'descripcion' },
          { header: 'Estacional', accessor: 'esEstacional' },
          { header: 'Precio', accessor: 'precio' },
        ]}
        data={combos}
      />
      <h3>Agregar Combo</h3>
      <input placeholder="Nombre" value={nuevoCombo.nombre} onChange={e => setNuevoCombo({...nuevoCombo, nombre: e.target.value})} />
      <input placeholder="Descripcion" value={nuevoCombo.descripcion} onChange={e => setNuevoCombo({...nuevoCombo, descripcion: e.target.value})} />
      <label>
        Estacional:
        <input type="checkbox" checked={nuevoCombo.esEstacional} onChange={e => setNuevoCombo({...nuevoCombo, esEstacional: e.target.checked})} />
      </label>
      <input type="number" placeholder="Precio" value={nuevoCombo.precio} onChange={e => setNuevoCombo({...nuevoCombo, precio: parseFloat(e.target.value)})} />
      <button onClick={agregarCombo}>Agregar Combo</button>
    </div>
  );
}
