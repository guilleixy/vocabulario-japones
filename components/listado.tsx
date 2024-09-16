"use client";
import { sql } from "@vercel/postgres";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useEffect, useState } from "react";

interface VocabularioRow {
  español: string;
  japones: string;
  categoria: string;
}

export default function Listado() {
  const [rows, setRows] = useState<VocabularioRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { rows } = await sql`SELECT * FROM vocabulario`;
      const mappedRows: VocabularioRow[] = rows.map((row: any) => ({
        español: row.español,
        japones: row.japones,
        categoria: row.categoria,
      }));
      setRows(mappedRows);
    }
    fetchData();
  }, []);

  return (
    <Table aria-label="Vocabulario Table">
      <TableHeader>
        <TableColumn>ESPAÑOL</TableColumn>
        <TableColumn>JAPONÉS</TableColumn>
        <TableColumn>CATEGORÍA</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.español}</TableCell>
            <TableCell>{row.japones}</TableCell>
            <TableCell>{row.categoria}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}