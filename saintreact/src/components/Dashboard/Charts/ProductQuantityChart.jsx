import React, { useEffect, useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductQuantityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/dashboard/valor_em_estoque_por_fornecedor');
        const result = await response.json();
        
        // Transformar dados para o formato esperado pelo gráfico
        const chartData = result || [];
        
        setData(chartData);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
        // Dados de exemplo para visualização em caso de erro
        setData([
          { name: 'Monitor', value: 5304089 },
          { name: 'Dell', value: 2481240 },
          { name: 'Tablet', value: 965750 },
          { name: 'Acer', value: 1489121 },
          { name: 'Acessórios', value: 450473 },
          { name: 'Samsung', value: 1333728 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Formatar valor para exibição em R$
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-medium mb-4 text-[var(--color-text-light)]">Valor em estoque por fornecedor e SKU</h3>
      <div className="flex flex-wrap mb-2">
        <div className="flex items-center mr-4 mb-1">
          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md flex items-center">
            Categoria
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="flex items-center mr-4 mb-1">
          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md flex items-center">
            Fornecedor
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : (
        <div className="relative">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsBarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-line)" />
              <XAxis 
                type="number" 
                tick={{ fontSize: 10 }} 
                axisLine={{ stroke: 'var(--color-line)' }}
                tickLine={{ stroke: 'var(--color-line)' }}
                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fontSize: 10 }} 
                axisLine={{ stroke: 'var(--color-line)' }}
                tickLine={{ stroke: 'var(--color-line)' }}
                width={80}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'var(--color-background-light)', 
                  borderColor: 'var(--color-line)',
                  color: 'var(--color-text-light)'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <button className="text-[var(--color-text-light)] p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductQuantityChart;
