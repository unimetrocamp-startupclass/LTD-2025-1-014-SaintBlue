import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  const getProdutos = async () => {
    try {
      const response = await api.get("estoque/listar");
      const data = response.data;
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao buscar os produtos.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  const handleDeleteProduct = async (codigo) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProdutos((prevProdutos) =>
            prevProdutos.filter((produto) => produto.codigo !== codigo)
          );
          await api.delete(`estoque/deletar/${codigo}`);
          Swal.fire({
            title: "Deletado!",
            text: `Produto com Código ${codigo} foi deletado com sucesso.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error(`Erro ao deletar produto com Código ${codigo}:`, error);
          Swal.fire({
            title: "Erro!",
            text: "Não foi possível deletar o produto. Tente novamente.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleViewProduct = (produto) => {
    const preco = parseFloat(produto.preco);
    Swal.fire({
      title: "Detalhes do Produto",
      html: `
        <p><strong>Nome:</strong> ${produto.produto}</p>
        <p><strong>Preço:</strong> ${
          !isNaN(preco) ? `R$ ${preco.toFixed(2)}` : "Preço indisponível"
        }</p>
        <p><strong>Marca:</strong> ${produto.marca}</p>
        <p><strong>Cor:</strong> ${produto.cor}</p>
        <p><strong>Código:</strong> ${produto.codigo}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
        <p><strong>Condição:</strong> ${produto.condicao}</p>
        <p><strong>Peso:</strong> ${produto.peso} kg</p>
        <p><strong>Observações:</strong> ${
          produto.observacoes || "Sem observações"
        }</p>
      `,
      icon: "info",
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="flex justify-center items-center py-4">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Gestão de Estoque
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-2">
          <input
            type="text"
            placeholder="Busca Rápida"
            className="w-full sm:w-64 bg-[var(--color-primary)] text-white placeholder-white rounded-lg px-4 py-2 focus:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)] transition-all"
            onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              if (searchValue.trim() === "") {
                getProdutos();
              } else {
                setProdutos((prevProdutos) =>
                  prevProdutos.filter((produto) =>
                    produto.produto.toLowerCase().includes(searchValue)
                  )
                );
              }
            }}
          />
          <button
            className="bg-[var(--color-primary)] text-white rounded-lg px-4 py-2 hover:bg-[var(--color-primary-dark)] active:bg-[var(--color-primary-darker)] shadow-md transition-all"
            onClick={() => navigate("/createProduct")}
          >
            Cadastrar
          </button>
        </div>

        <div className="detail-table-container stock-table flex-1">
          <div className="detail-table-wrapper">
            <table className="detail-table w-full">
              <thead className="detail-table-header">
                <tr>
                  <th className="detail-table-cell header-cell text-left">
                    ID
                  </th>
                  <th className="detail-table-cell header-cell text-left">
                    Produto
                  </th>
                  <th className="detail-table-cell header-cell text-left">
                    Marca
                  </th>
                  <th className="detail-table-cell header-cell text-right">
                    QTD
                  </th>
                  <th className="detail-table-cell header-cell text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {produtos.length === 0 ? (
                  <tr className="detail-table-row">
                    <td colSpan="5" className="detail-table-cell empty-cell">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  produtos.map((produto) => (
                    <tr key={produto.codigo} className="detail-table-row">
                      <td className="detail-table-cell">{produto.codigo}</td>
                      <td className="detail-table-cell">{produto.produto}</td>
                      <td className="detail-table-cell">{produto.marca}</td>
                      <td className="detail-table-cell text-right">
                        {produto.quantidade}
                      </td>
                      <td className="detail-table-cell">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleViewProduct(produto)}
                            className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                          >
                            <FaEye size={16} />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/updateProduct/${produto.codigo}`)
                            }
                            className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(produto.codigo)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrashAlt size={16} />
                          </button>
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
  );
};

export default Estoque;
