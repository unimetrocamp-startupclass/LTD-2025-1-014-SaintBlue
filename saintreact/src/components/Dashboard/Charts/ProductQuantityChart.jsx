import React, { useEffect, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductQuantityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/dashboard/valor_em_estoque_por_produto"
        );
        const result = await response.json();

        const chartData = result.map((item) => ({
          name: item.name,
          value: item.value || 0,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-medium mb-4 text-[var(--color-text-light)]">
        Valor em estoque por produto
      </h3>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-full text-[var(--color-gray-light)]">
          <p>Nenhum dado disponível</p>
        </div>
      ) : (
        <div className="relative h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="var(--color-line)"
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: "var(--color-line)" }}
                tickLine={{ stroke: "var(--color-line)" }}
                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: "var(--color-line)" }}
                tickLine={{ stroke: "var(--color-line)" }}
                width={80}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "var(--color-background-light)",
                  borderColor: "var(--color-line)",
                  color: "var(--color-text-light)",
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProductQuantityChart;
