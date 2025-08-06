const API_URL = 'http://localhost:5227/api';

async function getJSON(url) {
  const res = await fetch(`${API_URL}${url}`);
  if (!res.ok) throw new Error('Error en la petición');
  return res.json();
}

export const getTamales = () => getJSON('/Productos/producto');
export const getBebidas = () => getJSON('/Productos/bebidas');
export const getCombos = () => getJSON('/Combos');
export const getPedidos = () => getJSON('/Pedidos');
export const getVentasDiarias = () => getJSON('/Dashboard/ventas-diarias');
export const getVentasMensuales = () => getJSON('/Dashboard/ventas-mensuales');
export const getTamalTop = () => getJSON('/Dashboard/tamal-top');
export const getBebidaTop = () => getJSON('/Dashboard/bebida-top');

export const postTamal = (tamal) =>
  fetch(`${API_URL}/Productos/producto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tamal),
  });

export const postBebida = (bebida) =>
  fetch(`${API_URL}/Productos/bebidas`, {
    method: 'POST',
    body: JSON.stringify(bebida),
  });

export const postCombo = (combo) =>
  fetch(`${API_URL}/Combos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(combo),
  });

export const postPedido = (pedido) =>
  fetch(`${API_URL}/Pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
