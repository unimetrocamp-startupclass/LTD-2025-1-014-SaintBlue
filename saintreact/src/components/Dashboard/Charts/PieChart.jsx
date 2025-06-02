import React, { useEffect, useState, useMemo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoizar o array COLORS para evitar re-renderizações desnecessárias
  const COLORS = useMemo(
    () => [
      "#FF4500", // Laranja vibrante
      "#2d979b", // Verde
      "#FFC107", // Amarelo
      "var(--color-gray-light)", // Cinza claro (#f5f7fa em tema claro / #374151 em tema escuro)
    ],
    [] // Array de dependências vazio, pois COLORS é constante
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/dashboard/valor_estoque_por_marca"
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();

        // Transformar os dados para o formato do gráfico e atribuir cores dinamicamente
        const chartData = result.map((item, index) => ({
          name: item.marca || "Sem Marca",
          value: item.valor_total,
          color: COLORS[index % COLORS.length], // Atribui cores de forma cíclica
        }));

        setData(chartData);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setError(
          "Não foi possível carregar os dados. Verifique se a API está disponível."
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [COLORS]); // Adicionar COLORS como dependência

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Ajuste para centralizar mais
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Determinar cor do texto com base nas variáveis de tema
    const textColor = `var(--color-text-${
      document.body.classList.contains("dark") ? "dark" : "light"
    })`;

    return (
      <text
        x={x}
        y={y}
        fill={textColor}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-medium mb-4 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
        Distribuição do Valor em Estoque por Marca
      </h3>

      {/* Legenda dinâmica baseada nos dados da API */}
      <div className="flex flex-wrap mb-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center mr-4 mb-1">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-xs text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
              {entry.name}
            </span>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
            style={{ borderColor: "var(--color-primary)" }}
          ></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-[var(--color-gray-light)] dark:text-[var(--color-gray-dark)]">
          <p>Nenhum dado disponível</p>
        </div>
      ) : (
        <div className="relative">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  `R$ ${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`
                }
                contentStyle={{
                  backgroundColor: "var(--color-background-dark)",
                  borderColor: "var(--color-line)",
                  color: "var(--color-text-dark)",
                }}
                labelStyle={{ color: "var(--color-text-dark)" }}
                itemStyle={{ color: "var(--color-text-dark)" }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full p-4 custon-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 custom-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
