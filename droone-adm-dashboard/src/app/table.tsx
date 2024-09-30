'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

type TableData = any[];

const Table = () => {
  const params = useParams();
  const tableName = params.tableName as string;
  const [tableData, setTableData] = useState<TableData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://490c183a-566a-4c63-9213-eab0e1ab848e-00-2kimq7610alg4.worf.replit.dev/tables/${tableName}`);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
        setError('Erro ao carregar os dados da tabela');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [tableName]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tabela: {tableName}</h1>
      {tableData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key} className="border-b p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, cellIndex) => (
                  <td key={cellIndex} className="border-b p-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum dado disponível para esta tabela.</p>
      )}
      <Link href="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Voltar para a lista de tabelas
      </Link>
    </div>
  );
};

export default Table;