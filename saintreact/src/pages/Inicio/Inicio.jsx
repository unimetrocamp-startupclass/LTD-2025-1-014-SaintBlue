//saintreact/src/pages/Inicio/Inicio.jsx

import React from "react";
import styles from "./Inicio.module.css";
import BarChart from "../../components/Dashboard/Charts/BarChart";
import PieChart from "../../components/Dashboard/Charts/PieChart";
import ProductQuantityChart from "../../components/Dashboard/Charts/ProductQuantityChart";

const Inicio = () => {
  return (
    <main className={styles.geral}>
      <div className={styles.header}>
        <div className={styles.illustrationSection}>
          <div className={styles.illustrationPlaceholder}>
            <p>Ilustração: Carinha com caixas</p>
          </div>
        </div>
        <h1 className={styles.title}>DASHBOARD Controle de Estoque</h1>
      </div>

      {/* Cards de métricas no topo */}
      <div className={styles.metricsCards}>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>💰</span>
          <h2 className={styles.metricTitle}>Faturamento</h2>
          <p className={styles.metricValue}>R$ 912 Mi</p>
          <p className={styles.metricChange}>vs. anterior: 20%</p>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🏠</span>
          <h2 className={styles.metricTitle}>Valor em Estoque</h2>
          <p className={styles.metricValue}>R$ 23 Mil</p>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>❌</span>
          <h2 className={styles.metricTitle}>Ruptura de Estoque</h2>
          <p className={styles.metricValue}>6,99%</p>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🔄</span>
          <h2 className={styles.metricTitle}>Giro de Estoque</h2>
          <p className={styles.metricValue}>22,96 Mil</p>
        </div>
      </div>

      {/* Seção de gráficos */}
      <div className={styles.chartsSection}>
        <div className={styles.graficos}>
          <div className={styles.graficoItem}>
            <BarChart />
          </div>
          <div className={styles.graficoItem}>
            <PieChart />
          </div>
          <div className={styles.graficoItem}>
            <ProductQuantityChart />
          </div>
        </div>
      </div>

      {/* Rodapé com ícones de redes sociais */}
      <div className={styles.footer}>
        <span className={styles.socialIcon}>🐦</span>
        <span className={styles.socialIcon}>📷</span>
        <span className={styles.socialIcon}>👍</span>
        <span className={styles.socialIcon}>❤️</span>
      </div>
    </main>
  );
};

export default Inicio;