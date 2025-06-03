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

const BarChart = ({ dataUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const result = await response.json();

        const chartData = result.map((item) => ({
          name: item.produto,
          quantidade: item.quantidade,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setData([
          { name: "Mouse", quantidade: 50 },
          { name: "Teclado", quantidade: 30 },
          { name: "Monitor", quantidade: 20 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataUrl]);

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-medium mb-4 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
        Quantidade por Produto
      </h3>
      <div className="flex mb-2">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary-dark)] mr-1"></div>
          <span className="text-xs text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
            Quantidade
          </span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-line)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "var(--color-line)" }}
              tickLine={{ stroke: "var(--color-line)" }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "var(--color-line)" }}
              tickLine={{ stroke: "var(--color-line)" }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-background-light)",
                borderColor: "var(--color-line)",
                color: "var(--color-text-light)",
              }}
            />
            <Bar
              dataKey="quantidade"
              fill="var(--color-primary-dark)"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChart;
