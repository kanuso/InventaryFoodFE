import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export function BasicTable({ columns = [], data = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
<TableHead>
  <TableRow>
    {columns.map((col) => (
      <TableCell key={col.accessor} sx={{ fontWeight: 'bold' }}>
        {col.header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id || index}>
              {columns.map((col) => (
                <TableCell key={col.accessor}>
                  {Array.isArray(row[col.accessor])
                    ? row[col.accessor].join(', ')
                    : String(row[col.accessor])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
