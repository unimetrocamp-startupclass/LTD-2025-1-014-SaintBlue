from flask import Blueprint, request, jsonify
from models.produto import Produto

produto_bp = Blueprint('produto', __name__)

@produto_bp.route('/estoque/cadastrar', methods=['POST'])
def adicionar_produto():
    data = request.get_json()
    try:
        produto = Produto(**data)
        produto.salvar()
        return jsonify({"message": "Produto adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@produto_bp.route('/estoque/deletar/<codigo>', methods=['DELETE'])
def deletar_produto(codigo):
    try:
        deletados = Produto.deletar(codigo)
        if deletados:
            return jsonify({"message": "Produto deletado com sucesso"}), 200
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@produto_bp.route('/estoque/editar/<codigo>', methods=['PUT'])
def editar_produto(codigo):
    data = request.get_json()
    try:
        atualizados = Produto.atualizar(codigo, data)
        if atualizados:
            return jsonify({"message": "Produto atualizado com sucesso"}), 200
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@produto_bp.route('/estoque/listar', methods=['GET'])
def listar_produtos():
    try:
        produtos = Produto.listar_todos()
        return jsonify([
            {
                "produto": p[0], "preco": p[1], "marca": p[2], "cor": p[3],
                "codigo": p[4], "quantidade": p[5], "condicao": p[6], "peso": p[7], "observacoes": p[8]
            } for p in produtos
        ]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@produto_bp.route('/estoque/produto/<codigo>', methods=['GET'])
def buscar_produto(codigo):
    try:
        produto = Produto.buscar_por_codigo(codigo)
        if produto:
            return jsonify(produto), 200 
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500