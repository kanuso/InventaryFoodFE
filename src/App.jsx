// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Productos } from './pages/Productos';
import { Combos } from './pages/Combos';
import { Pedidos } from './pages/Pedidos';

export default function App() {  // <-- aquí export default
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/productos">Productos</Link> |{' '}
        <Link to="/combos">Combos</Link> |{' '}
        <Link to="/pedidos">Pedidos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}
