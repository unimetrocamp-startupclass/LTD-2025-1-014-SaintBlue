# BackEnd/routes/estoque.py
from flask import Blueprint, request, jsonify
from database import get_db_connection  # Importe de database.py

estoque_bp = Blueprint('estoque', __name__)

# Rota para cadastrar um produto no estoque
@estoque_bp.route('/cadastrar', methods=['POST'])
def cadastrar_produto():
    dados = request.json
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        query = """
            INSERT INTO estoque (produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            dados['produto'], dados['preco'], dados['marca'], dados['cor'], dados['codigo'],
            dados['quantidade'], dados['condicao'], dados['peso'], dados.get('observacoes', '')
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'mensagem': 'Produto cadastrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para deletar um produto do estoque
@estoque_bp.route('/deletar/<string:codigo>', methods=['DELETE'])
def deletar_produto(codigo):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        cursor.execute("DELETE FROM estoque WHERE codigo = %s", (codigo,))
        if cursor.rowcount == 0:
            return jsonify({'erro': 'Produto não encontrado'}), 404
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'mensagem': 'Produto deletado com sucesso!'})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para editar um produto do estoque
@estoque_bp.route('/editar/<string:codigo>', methods=['PUT'])
def editar_produto(codigo):
    dados = request.json
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        query = """
            UPDATE estoque
            SET produto = %s, preco = %s, marca = %s, cor = %s, quantidade = %s, condicao = %s, peso = %s, observacoes = %s
            WHERE codigo = %s
        """
        cursor.execute(query, (
            dados.get('produto'), dados.get('preco'), dados.get('marca'), dados.get('cor'),
            dados.get('quantidade'), dados.get('condicao'), dados.get('peso'), dados.get('observacoes'), codigo
        ))
        if cursor.rowcount == 0:
            return jsonify({'erro': 'Produto não encontrado'}), 404
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'mensagem': 'Produto atualizado com sucesso!'})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para listar todos os produtos no estoque
@estoque_bp.route('/listar', methods=['GET'])
def listar_produtos():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        cursor.execute("SELECT produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes FROM estoque")
        produtos = cursor.fetchall()
        cursor.close()
        conn.close()

        produtos_lista = [
            {
                'produto': produto[0], 'preco': produto[1], 'marca': produto[2], 'cor': produto[3],
                'codigo': produto[4], 'quantidade': produto[5], 'condicao': produto[6],
                'peso': produto[7], 'observacoes': produto[8]
            } for produto in produtos
        ]
        return jsonify(produtos_lista)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para buscar um produto pelo código
@estoque_bp.route('/produto/<string:codigo>', methods=['GET'])
def buscar_produto(codigo):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        query = "SELECT produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes FROM estoque WHERE codigo = %s"
        cursor.execute(query, (codigo,))
        produto = cursor.fetchone()
        cursor.close()
        conn.close()

        if not produto:
            return jsonify({"error": "Produto não encontrado"}), 404

        produto_data = {
            "produto": produto[0], "preco": produto[1], "marca": produto[2], "cor": produto[3],
            "codigo": produto[4], "quantidade": produto[5], "condicao": produto[6],
            "peso": produto[7], "observacoes": produto[8]
        }
        return jsonify({"produto": produto_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500