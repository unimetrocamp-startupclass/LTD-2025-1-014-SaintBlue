// saintreact/src/components/Dashboard/Charts/BarChart.jsx

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import styles from "../../../pages/Inicio/Inicio.module.css";
import api from "../../../services/api";

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "dashboard/quantidade_por_condicao"
        );
        const formattedData = response.data.map((item) => ({
          name: item.condicao.charAt(0).toUpperCase() + item.condicao.slice(1),
          quantidade: item.quantidade,
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
      <h2 className={styles.chartTitle}>Quantidade por Condição</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#DDE1E6" />
          <XAxis dataKey="name" tick={{ fill: "#333333", fontSize: 12 }} />
          <YAxis tick={{ fill: "#333333", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #DDE1E6",
              borderRadius: "8px",
              color: "#333333",
              padding: "8px",
            }}
            labelStyle={{ color: "#333333" }}
          />
          <Bar
            dataKey="quantidade"
            fill="#4A90E2"
            isAnimationActive={true}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;