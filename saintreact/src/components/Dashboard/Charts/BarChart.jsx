import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Janeiro', vendas: 4000 },
  { name: 'Fevereiro', vendas: 3000 },
  { name: 'Março', vendas: 2000 },
];

const Barchart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>  {/* altura fixa aqui */}
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="vendas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
