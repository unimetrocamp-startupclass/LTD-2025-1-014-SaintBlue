//saint/src/components/Dashboard/Charts/PieChart.jsx

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../../../pages/Inicio/Inicio.module.css";
import api from "../../../services/api";

const COLORS = ["#4A90E2", "#50C878", "#FFD60A", "#FF6F61"];

const PieChartVendas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "dashboard/produtos_por_marca"
        );
        const formattedData = response.data.map((item) => ({
          name: item.marca,
          value: item.total,
        }));
        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados do gráfico");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.chartLoading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.chartError}>{error}</div>;
  }

  return (
    <div>
      <h2 className={styles.chartTitle}>Produtos por Marca</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E6",
              borderRadius: "8px",
              color: "#333333",
              padding: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartVendas;