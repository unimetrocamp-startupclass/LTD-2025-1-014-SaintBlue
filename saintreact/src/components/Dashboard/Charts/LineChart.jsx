import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { dia: "Seg", estoque: 120 },
  { dia: "Ter", estoque: 115 },
  { dia: "Qua", estoque: 110 },
  { dia: "Qui", estoque: 105 },
  { dia: "Sex", estoque: 100 },
];

const LineChartEstoque = () => {
  return (
    <div className="chart-wrapper">
      <h3>Estoque da Semana</h3>
      <ResponsiveContainer width="100%" height={300}> {/* altura fixa */}
        <LineChart data={data}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="estoque" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartEstoque;
