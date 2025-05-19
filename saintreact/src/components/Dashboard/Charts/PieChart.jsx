import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Eletrônicos", value: 400 },
  { name: "Roupas", value: 300 },
  { name: "Alimentos", value: 300 },
  { name: "Outros", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartVendas = () => {
  return (
    <div className="chart-wrapper">
      <h3>Vendas por Categoria</h3>
      <ResponsiveContainer width="100%" height={300}> {/* altura fixa */}
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartVendas;
