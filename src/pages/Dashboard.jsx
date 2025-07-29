// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getVentasDiarias, getVentasMensuales, getTamalTop, getBebidaTop } from '../services/api';

export function Dashboard() {
  const [ventasDiarias, setVentasDiarias] = useState(0);
  const [ventasMensuales, setVentasMensuales] = useState(0);
  const [tamalTop, setTamalTop] = useState('');
  const [bebidaTop, setBebidaTop] = useState('');

  useEffect(() => {
    getVentasDiarias().then(setVentasDiarias);
    getVentasMensuales().then(setVentasMensuales);
    getTamalTop().then(setTamalTop);
    getBebidaTop().then(setBebidaTop);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Ventas Diarias: Q{ventasDiarias}</p>
      <p>Ventas Mensuales: Q{ventasMensuales}</p>
      <p>Tamal Más Vendido: {tamalTop}</p>
      <p>Bebida Preferida: {bebidaTop}</p>
    </div>
  );
}
