'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

type TableData = string[][];

const LOCAL_STORAGE_KEY = 'tableData';
const COOKIE_KEY = 'savedPage';

// Componente separado para o loader
const Loader = () => {
  useEffect(() => {
    import('ldrs').then(({ jelly }) => jelly.register());
  }, []);

  return <l-jelly size="40" speed="0.9" color="white"></l-jelly>;
};

export default function Home() {
  const [tabelas, setData] = useState<TableData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadInitialData = () => {
      const savedPage = Cookies.get(COOKIE_KEY);
      if (savedPage) {
        setData(JSON.parse(savedPage));
        return;
      }
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };

    loadInitialData();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<TableData>('https://490c183a-566a-4c63-9213-eab0e1ab848e-00-2kimq7610alg4.worf.replit.dev/tables/');
        console.log('Data received from API:', response.data);

        const currentData = Cookies.get(COOKIE_KEY) || localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
        if (JSON.stringify(response.data) !== currentData) {
          setData(response.data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
          Cookies.set(COOKIE_KEY, JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isClient) {
    return null; // ou um loader, se preferir
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-60 min-h-screen bg-gray-900 dark:bg-gray-900">
      <h1 className="text-5xl font-bold font-jost text-white my-6 text-center">
        Droone Dashboard
      </h1>
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <Loader />
        </div>
      )}
      <table className="table-auto w-3/5 text-left text-sm text-gray-500 dark:text-gray-400 font-sans font-medium shadow-md border-collapse border border-gray-300 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6 font-bold text-lg">Tabela</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
          {tabelas.map((tabela, index) => (
            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => window.location.href = `/${tabela}/`}>                
              <td className="py-3 px-6 font-medium text-gray-900 dark:text-gray-100">
                {tabela}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}