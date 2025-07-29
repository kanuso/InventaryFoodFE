import { useEffect, useState } from 'react';
import {
  getPedidos,
  postPedido,
  getTamales,
  getBebidas,
  getCombos,
} from '../services/api';
import { Table } from '../components/Table';

export function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [tamales, setTamales] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [combos, setCombos] = useState([]);

  const [nuevoPedido, setNuevoPedido] = useState({
    fecha: '',
    productos: [],
    total: 0,
  });

  const [seleccion, setSeleccion] = useState({
    tamal: '',
    bebida: '',
    combo: '',
  });

  useEffect(() => {
    getPedidos().then(setPedidos);
    getTamales().then(setTamales);
    getBebidas().then(setBebidas);
    getCombos().then(setCombos);
  }, []);

  async function agregarPedido() {
    const pedido = {
      fecha: nuevoPedido.fecha,
      productos: nuevoPedido.productos,
      total: parseFloat(nuevoPedido.total),
    };
    await postPedido(pedido);
    const data = await getPedidos();
    setPedidos(data);
    setNuevoPedido({ fecha: '', productos: [], total: 0 });
  }

  const agregarProducto = (tipo, valor) => {
    if (valor && !nuevoPedido.productos.includes(valor)) {
      setNuevoPedido({
        ...nuevoPedido,
        productos: [...nuevoPedido.productos, valor],
      });
    }
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <Table
        columns={[
          { header: 'Fecha', accessor: 'fecha' },
          { header: 'Productos', accessor: 'productos' },
          { header: 'Total', accessor: 'total' },
        ]}
        data={pedidos}
      />

      <h3>Agregar Pedido</h3>

      <input
        type="date"
        value={nuevoPedido.fecha}
        onChange={(e) =>
          setNuevoPedido({ ...nuevoPedido, fecha: e.target.value })
        }
      />

      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <div>
          <label>Tamal:</label><br />
          <select
            value={seleccion.tamal}
            onChange={(e) => {
              setSeleccion({ ...seleccion, tamal: e.target.value });
              agregarProducto('tamal', e.target.value);
            }}
          >
            <option value="">Selecciona uno</option>
            {tamales.map((t) => (
              <option key={t.id} value={`Tamal: ${t.tipoMasa} ${t.relleno}`}>
                {t.tipoMasa} {t.relleno}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Bebida:</label><br />
          <select
            value={seleccion.bebida}
            onChange={(e) => {
              setSeleccion({ ...seleccion, bebida: e.target.value });
              agregarProducto('bebida', e.target.value);
            }}
          >
            <option value="">Selecciona una</option>
            {bebidas.map((b) => (
              <option key={b.id} value={`Bebida: ${b.tipo}`}>
                {b.tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Combo:</label><br />
          <select
            value={seleccion.combo}
            onChange={(e) => {
              setSeleccion({ ...seleccion, combo: e.target.value });
              agregarProducto('combo', e.target.value);
            }}
          >
            <option value="">Selecciona uno</option>
            {combos.map((c) => (
              <option key={c.id} value={`Combo: ${c.nombre}`}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="number"
        placeholder="Total"
        value={nuevoPedido.total}
        onChange={(e) =>
          setNuevoPedido({ ...nuevoPedido, total: e.target.value })
        }
      />

      <button onClick={agregarPedido}>Agregar Pedido</button>

      <p>Productos agregados: {nuevoPedido.productos.join(', ')}</p>
    </div>
  );
}
