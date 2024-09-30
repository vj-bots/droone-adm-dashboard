'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

type TableData = string[][];

const LOCAL_STORAGE_KEY = 'tableData';
const COOKIE_KEY = 'savedPage';
const DATA_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// Componente separado para o loader
const Loader = () => {
  useEffect(() => {
    import('ldrs').then(({ jelly }) => {
      jelly.register();
      console.log('Loader component registered');
    });
  }, []);

  return <l-jelly size="40" speed="0.9" color="white"></l-jelly>;
};

// Componente de Alerta
const Alert = ({ message }: { message: string }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 text-center z-50">
    {message}
  </div>
);

export default function Home() {
  const [tabelas, setData] = useState<TableData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Component mounted, isLoading:', isLoading);
    setIsClient(true);

    const loadInitialData = () => {
      const savedPage = Cookies.get(COOKIE_KEY);
      if (savedPage) {
        const { data, timestamp } = JSON.parse(savedPage);
        if (Date.now() - timestamp < DATA_EXPIRATION_TIME) {
          setData(data);
          setIsLoading(false);
          console.log('Data loaded from cookie, isLoading set to false');
          return true;
        }
      }
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const { data, timestamp } = JSON.parse(storedData);
        if (Date.now() - timestamp < DATA_EXPIRATION_TIME) {
          setData(data);
          setIsLoading(false);
          console.log('Data loaded from localStorage, isLoading set to false');
          return true;
        }
      }
      return false;
    };

    const fetchData = async () => {
      console.log('Fetching data, isLoading:', isLoading);
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await axios.get<TableData>(
          'https://490c183a-566a-4c63-9213-eab0e1ab848e-00-2kimq7610alg4.worf.replit.dev/tables/',
          { timeout: 10000 }
        );
        console.log('Data received from API:', response.data);

        const newData = {
          data: response.data,
          timestamp: Date.now()
        };

        setData(response.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
        Cookies.set(COOKIE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiError('Sem contato com o servidor');
        setData([]);
      } finally {
        setIsLoading(false);
        console.log('Data fetch completed, isLoading set to false');
      }
    };

    const dataLoaded = loadInitialData();
    if (!dataLoaded) {
      fetchData();
    }
  }, []);

  console.log('Rendering, isLoading:', isLoading, 'isClient:', isClient);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-60 min-h-screen bg-gray-900 dark:bg-gray-900">
      <h1 className="text-5xl font-bold font-jost text-white my-6 text-center">
        Droone Dashboard
      </h1>
      {isLoading ? (
        <div className="fixed top-4 right-4 z-50">
          <Loader />
        </div>
      ) : tabelas.length > 0 ? (
        <table className="table-auto w-4/5 text-left text-sm text-gray-500 dark:text-gray-400 font-sans font-medium shadow-md rounded-lg border-collapse border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6 font-bold text-lg">Tabela</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            {tabelas.map((tabela, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer fade-in-row" 
                style={{animationDelay: `${index * 50}ms`}}
              >                
                <td className="py-3 px-6 font-medium text-gray-900 dark:text-gray-100 text-lg">
                  <Link href={`/table/${tabela}`} className="block w-full h-full">
                    {tabela}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">Nenhuma tabela disponível.</p>
      )}
      <footer className="text-center text-white mt-4 mb-3">
        Desenvolvido por Droone &copy;
      </footer>
      {apiError && <Alert message={apiError} />}
    </div>
  );
}