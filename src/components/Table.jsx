// src/components/Table.jsx
export function Table({ columns, data }) {
  return (
    <table border="1" cellPadding={5} cellSpacing={0}>
      <thead>
        <tr>{columns.map((col) => <th key={col.accessor}>{col.header}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.accessor}>{row[col.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
