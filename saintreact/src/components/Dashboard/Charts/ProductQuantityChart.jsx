//saintreact/src/components/Dashboard/Charts/LineChart.jsx

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
import axios from "axios";
import styles from "../../../pages/Inicio/Inicio.module.css";

const ProductQuantityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/quantidade_por_produto"
        );
        // Pega os top 5 produtos com maior quantidade
        const sortedData = response.data
          .sort((a, b) => b.quantidade - a.quantidade)
          .slice(0, 5)
          .map((item) => ({
            name: item.produto,
            quantidade: item.quantidade,
          }));
        setData(sortedData);
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
      <h2 className={styles.chartTitle}>Top 5 Produtos por Quantidade</h2>
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
          />
          <Bar
            dataKey="quantidade"
            fill="#50C878"
            isAnimationActive={true}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductQuantityChart;