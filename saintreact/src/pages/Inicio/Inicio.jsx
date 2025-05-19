import React from "react";
import styles from "./Inicio.module.css";
import Carregador from "./Carregador";
import Contact from "./Contact";
import BarChart from "../../components/Dashboard/Charts/BarChart";
import PieChart from "../../components/Dashboard/Charts/PieChart";
import LineChart from "../../components/Dashboard/Charts/LineChart";

const Inicio = () => {
  return (
    <main className={styles.geral}>
      <div className={styles.header}>
        <div className={styles.bemVindo}>
          <Carregador />
        </div>
        <div className={styles.container}>
          <h1 className={styles.aba}>Início</h1>
        </div>
      </div>

      {/* Primeiro, suas caixas com textos e valores */}
      <div className={styles.cards}>
        <div className={styles.caixa} id="caixa_faturamento">
          <h2 className={styles.titulo}>Faturamento 2024</h2>
          <p className={styles.valor}>R$ 10.000</p>
        </div>

        <div className={styles.caixa} id="caixa_venda">
          <h2 className={styles.titulo}>Vendas Hoje</h2>
          <p className={styles.valor}>R$ 5.000</p>
        </div>

        <div className={styles.caixa} id="caixa_estoque">
          <h2 className={styles.titulo}>Produtos em Estoque</h2>
          <p className={styles.valor}>120 unid</p>
        </div>
      </div>

      {/* Agora, gráficos separados, fora das caixas */}
      <div className={styles.graficos}>
        <div className={styles.graficoItem}>
          <BarChart />
        </div>

        <div className={styles.graficoItem}>
          <PieChart />
        </div>

        <div className={styles.graficoItem}>
          <LineChart />
        </div>
      </div>

      <Contact />
    </main>
  );
};

export default Inicio;
