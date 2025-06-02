// dashboard/inicio.jsx
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
  const [filtroClasse, setFiltroClasse] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const totalResponse = await fetch(
          "http://localhost:5050/dashboard/quantidade_total"
        );
        const totalData = await totalResponse.json();
        console.log("Total Quantidade(daniel):", totalData);
        setTotalQuantidade(totalData.quantidade_total|| 0);

        const valorResponse = await fetch(
          "http://localhost:5050/dashboard/soma_precos"
        );
        const valorData = await valorResponse.json();
        console.log(valorResponse)
        console.log("Valor Total(daniel):", valorData);
        setValorTotal(valorData.soma_total_precos || 0);

        const rupturaResponse = await fetch("http://localhost:5050/dashboard/percentual_zerados");
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

  const calcularClassificacaoABC = (produtos) => {
    if (!produtos || produtos.length === 0) return [];

    const produtosComValor = produtos.map((produto) => ({
      ...produto,
      valorTotal: produto.preco * produto.quantidade,
    }));

    const valorTotalGeral = produtosComValor.reduce(
      (sum, p) => sum + p.valorTotal,
      0
    );

    produtosComValor.sort((a, b) => b.valorTotal - a.valorTotal);

    let valorAcumulado = 0;
    const produtosClassificados = produtosComValor.map((produto, index) => {
      valorAcumulado += produto.valorTotal;
      const percentualAcumulado = (valorAcumulado / valorTotalGeral) * 100;

      let classe;
      if (percentualAcumulado <= 80) {
        classe = "A";
      } else if (percentualAcumulado <= 95) {
        classe = "B";
      } else {
        classe = "C";
      }

      return { ...produto, classe };
    });

    return produtosClassificados;
  };

  const produtosClassificados = calcularClassificacaoABC(produtos);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleClasseFilter = (classe) => {
    setFiltroClasse((prev) =>
      prev.includes(classe)
        ? prev.filter((c) => c !== classe)
        : [...prev, classe]
    );
  };

  const getClasseColor = (classe) => {
    switch (classe) {
      case "A":
        return "bg-green-500";
      case "B":
        return "bg-yellow-500";
      case "C":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredProdutos = produtosClassificados.filter((produto) => {
    const categoriaMatch =
      filtroCategoria === "Todos" || produto.produto === filtroCategoria;
    const classeMatch =
      filtroClasse.length === 0 || filtroClasse.includes(produto.classe);
    return categoriaMatch && classeMatch;
  });

  return (
    <div className="flex flex-col w-full text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        {/* Coluna da esquerda - Ilustração e título */}
        <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-start pt-8">
          <div className="mb-4 w-full h-56 flex items-center justify-center">
            <img
              src="/entregador-sem-fundoo.png"
              alt="Entregador com caixas"
              className="max-h-full object-contain"
              onError={(e) => {
                console.error("Erro ao carregar a imagem:", e.target.src);
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-center mt-4">
            D A S H B O A R D
          </h1>
          <h2 className="text-xl font-medium text-center mt-2">
            Controle de Estoque
          </h2>
        </div>

        {/* Coluna central - Cards e gráficos principais */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Cards de métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Card Total em Estoque */}
            <div className="rounded-lg p-4 flex items-center border border-gray-700 dark:bg-[var(--color-background-dark)] dark:text-[var(--color-text-dark)] shadow-md dark:shadow-none">
              <div className="bg-blue-500 rounded-lg p-3 mr-3">
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
                <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  Total em Estoque
                </h2>
                <p className="text-xl font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                  {loading
                    ? "Carregando..."
                    : `${totalQuantidade.toLocaleString()} unidades`}
                </p>
              </div>
            </div>

            {/* Card Valor em Estoque */}
            <div className="rounded-lg p-4 flex items-center border border-gray-700 dark:bg-[var(--color-background-dark)] dark:text-[var(--color-text-dark)] shadow-md dark:shadow-none">
              <div className="bg-green-500 rounded-lg p-3 mr-3">
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
                <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  Valor em Estoque
                </h2>
                <p className="text-xl font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                  {loading ? "Carregando..." : formatCurrency(valorTotal)}
                </p>
              </div>
            </div>

            {/* Card Produto Zerado (antigo Ruptura de Estoque) */}
            <div className="rounded-lg p-4 flex items-center border border-gray-700 dark:bg-[var(--color-background-dark)] dark:text-[var(--color-text-dark)] shadow-md dark:shadow-none">
              <div className="bg-red-500 rounded-lg p-3 mr-3">
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
                <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  Produto Zerado
                </h2>
                <p className="text-xl font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                  {loading ? "Carregando..." : ruptura}
                </p>
              </div>
            </div>

            {/* Card Giro de Estoque */}
            <div className="rounded-lg p-4 flex items-center border border-gray-700 dark:bg-[var(--color-background-dark)] dark:text-[var(--color-text-dark)] shadow-md dark:shadow-none">
              <div className="bg-purple-500 rounded-lg p-3 mr-3">
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
                <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500">
                  Giro de Estoque
                </h2>
                <p className="text-xl font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                  {loading
                    ? "Carregando..."
                    : `${giro.toLocaleString()} unidades`}
                </p>
              </div>
            </div>
          </div>

          {/* Gráfico de barras - Faturamento ao longo do tempo */}
          <div className="rounded-lg p-4 border border-gray-700 dark:bg-[var(--color-background-dark)] shadow-md dark:shadow-none">
            <BarChart dataUrl="http://localhost:5050/dashboard/quantidade_por_produto" />
          </div>

          {/* Gráficos inferiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gráfico de pizza - Valor em estoque por área */}
            <div className="rounded-lg p-4 border border-gray-700 dark:bg-[var(--color-background-dark)] shadow-md dark:shadow-none">
              <PieChart dataUrl="http://localhost:5050/dashboard/quantidade_por_marca" />
            </div>

            {/* Gráfico de barras horizontal - Valor em estoque por fornecedor */}
            <div className="rounded-lg p-4 border border-gray-700 dark:bg-[var(--color-background-dark)] shadow-md dark:shadow-none">
              <ProductQuantityChart dataUrl="http://localhost:5050/dashboard/quantidade_por_condicao" />
            </div>
          </div>
        </div>

        {/* Coluna da direita - Filtros e tabela de detalhamento */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Filtros */}
          <div className="rounded-lg p-4 border border-gray-700 dark:bg-[var(--color-background-dark)] shadow-md dark:shadow-none">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-gray-400 dark:text-gray-500">
                Categoria
              </h3>
              <select
                className="w-full bg-transparent border border-gray-600 dark:border-gray-600 rounded-md p-2 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]"
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

            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-400 dark:text-gray-500">
                Classificação ABC
              </h3>
              <div className="flex gap-2">
                {["A", "B", "C"].map((classe) => (
                  <button
                    key={classe}
                    className={`w-10 h-10 rounded-md border border-gray-600 dark:border-gray-600 ${
                      filtroClasse.includes(classe)
                        ? "bg-white text-black dark:bg-gray-200 dark:text-black"
                        : "bg-transparent text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]"
                    }`}
                    onClick={() => toggleClasseFilter(classe)}
                  >
                    {classe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabela de detalhamento */}
          <div className="rounded-lg p-4 flex-grow border border-gray-700 dark:bg-[var(--color-background-dark)] shadow-md dark:shadow-none">
            <h3 className="text-lg font-medium mb-4 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
              Detalhamento
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-line)] dark:border-[var(--color-line-dark)]">
                    <th className="py-2 px-1 text-left text-sm font-medium text-gray-400 dark:text-gray-500">
                      Categoria
                    </th>
                    <th className="py-2 px-1 text-right text-sm font-medium text-gray-400 dark:text-gray-500">
                      Qtd. de Estoque
                    </th>
                    <th className="py-2 px-1 text-right text-sm font-medium text-gray-400 dark:text-gray-500">
                      Valor Estoque
                    </th>
                    <th className="py-2 px-1 text-center text-sm font-medium text-gray-400 dark:text-gray-500">
                      Class. ABC
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 text-center text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : filteredProdutos.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 text-center text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]"
                      >
                        Nenhum produto encontrado.
                      </td>
                    </tr>
                  ) : (
                    filteredProdutos.slice(0, 15).map((produto, index) => (
                      <tr
                        key={index}
                        className="border-b border-[var(--color-line)] dark:border-[var(--color-line-dark)]"
                      >
                        <td className="py-2 px-1 text-sm text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500 custom-icon"
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
                          </div>
                        </td>
                        <td className="py-2 px-1 text-right text-sm text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                          {produto.quantidade}
                        </td>
                        <td className="py-2 px-1 text-right text-sm text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                          {formatCurrency(produto.preco * produto.quantidade)}
                        </td>
                        <td className="py-2 px-1 text-center">
                          <div className="flex justify-center">
                            <span
                              className={`inline-block w-5 h-5 rounded-full ${getClasseColor(
                                produto.classe
                              )} text-white text-xs flex items-center justify-center`}
                            >
                              {produto.classe}
                            </span>
                          </div>
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
