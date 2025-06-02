import React, { useEffect, useState } from "react";
import BarChart from "../../components/Dashboard/Charts/BarChart";
import PieChart from "../../components/Dashboard/Charts/PieChart";
import ProductQuantityChart from "../../components/Dashboard/Charts/ProductQuantityChart";

const Inicio = () => {
  const [produtos, setProdutos] = useState([]);
  const [totalQuantidade, setTotalQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [ruptura, setRuptura] = useState("0%");
  const [giro, setGiro] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const totalResponse = await fetch(
          "http://localhost:5050/dashboard/quantidade_total"
        );
        const totalData = await totalResponse.json();
        console.log("Total Quantidade(daniel):", totalData);
        setTotalQuantidade(totalData.quantidade_total || 0);

        const valorResponse = await fetch(
          "http://localhost:5050/dashboard/soma_precos"
        );
        const valorData = await valorResponse.json();
        console.log(valorResponse);
        console.log("Valor Total(daniel):", valorData);
        setValorTotal(valorData.soma_total_precos || 0);

        const rupturaResponse = await fetch(
          "http://localhost:5050/dashboard/percentual_zerados"
        );
        const rupturaData = await rupturaResponse.json();
        console.log("Percentual de produtos vazios(daniel):", rupturaData);
        setRuptura((rupturaData.percentual_zerados || 0) + "%");

        const produtosResponse = await fetch(
          "http://localhost:5050/estoque/listar"
        );
        const produtosData = await produtosResponse.json();
        console.log("Produtos:", produtosData);
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        setTotalQuantidade(0);
        setValorTotal(0);
        setRuptura("0%");
        setGiro(0);
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filteredProdutos = produtos.filter((produto) => {
    const categoriaMatch =
      filtroCategoria === "Todos" || produto.produto === filtroCategoria;
    return categoriaMatch;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Coluna da esquerda - Ilustração e título */}
        <div className="dashboard-sidebar">
          <div className="sidebar-image-container">
            <img
              src="/entregador-sem-fundoo.png"
              alt="Entregador com caixas"
              className="sidebar-image"
              onError={(e) => {
                console.error("Erro ao carregar a imagem:", e.target.src);
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <h1 className="sidebar-title">D A S H B O A R D</h1>
          <h2 className="sidebar-subtitle">Controle de Estoque</h2>
        </div>

        {/* Coluna central - Cards e gráficos principais */}
        <div className="dashboard-main">
          {/* Cards de métricas */}
          <div className="metrics-cards">
            {/* Card Total em Estoque */}
            <div className="metric-card">
              <div className="metric-icon bg-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 custom-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="metric-label">Total em Estoque</h2>
                <p className="metric-value">
                  {loading
                    ? "Carregando..."
                    : `${totalQuantidade.toLocaleString()} unidades`}
                </p>
              </div>
            </div>

            {/* Card Valor em Estoque */}
            <div className="metric-card">
              <div className="metric-icon bg-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 custom-icon"
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
              <div>
                <h2 className="metric-label">Valor em Estoque</h2>
                <p className="metric-value">
                  {loading ? "Carregando..." : formatCurrency(valorTotal)}
                </p>
              </div>
            </div>

            {/* Card Produto Zerado */}
            <div className="metric-card">
              <div className="metric-icon bg-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 custom-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h2 className="metric-label">Produto Zerado</h2>
                <p className="metric-value">
                  {loading ? "Carregando..." : ruptura}
                </p>
              </div>
            </div>

            {/* Card Giro de Estoque */}
            <div className="metric-card">
              <div className="metric-icon bg-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 custom-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <h2 className="metric-label">Giro de Estoque</h2>
                <p className="metric-value">
                  {loading
                    ? "Carregando..."
                    : `${giro.toLocaleString()} unidades`}
                </p>
              </div>
            </div>
          </div>

          {/* Gráfico de barras - Faturamento ao longo do tempo */}
          <div className="bar-chart chart-container">
            <BarChart dataUrl="http://localhost:5050/dashboard/quantidade_por_produto" />
          </div>

          {/* Gráficos inferiores */}
          <div className="charts-row">
            {/* Gráfico de pizza - Valor em estoque por área */}
            <div className="pie-chart chart-container">
              <PieChart dataUrl="http://localhost:5050/dashboard/quantidade_por_marca" />
            </div>

            {/* Gráfico de barras horizontal - Valor em estoque por fornecedor */}
            <div className="product-chart chart-container">
              <ProductQuantityChart dataUrl="http://localhost:5050/dashboard/quantidade_por_condicao" />
            </div>
          </div>
        </div>

        {/* Coluna da direita - Filtros e tabela de detalhamento */}
        <div className="dashboard-sidebar-right">
          {/* Filtros */}
          <div className="filters-container">
            <div className="filter-group">
              <h3 className="filter-label">Categoria</h3>
              <select
                className="filter-select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {[...new Set(produtos.map((p) => p.produto))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabela de detalhamento */}
          <div className="detail-table-container">
            <h3 className="detail-table-title">Detalhamento</h3>
            <div className="detail-table-wrapper">
              <table className="detail-table">
                <thead className="detail-table-header1">
                  <tr>
                    <th className="detail-table-cell header-cell text-left">
                      Categoria
                    </th>
                    <th className="detail-table-cell header-cell text-right">
                      Qtd. de Estoque
                    </th>
                    <th className="detail-table-cell header-cell text-right">
                      Valor Estoque
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="detail-table-row">
                      <td
                        colSpan="3"
                        className="detail-table-cell loading-cell"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : filteredProdutos.length === 0 ? (
                    <tr className="detail-table-row">
                      <td colSpan="3" className="detail-table-cell empty-cell">
                        Nenhum produto encontrado.
                      </td>
                    </tr>
                  ) : (
                    filteredProdutos.slice(0, 15).map((produto, index) => (
                      <tr key={index} className="detail-table-row">
                        <td className="detail-table-cell category-cell">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="category-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                            />
                          </svg>
                          {produto.produto}
                        </td>
                        <td className="detail-table-cell text-right">
                          {produto.quantidade}
                        </td>
                        <td className="detail-table-cell text-right">
                          {formatCurrency(produto.preco * produto.quantidade)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
