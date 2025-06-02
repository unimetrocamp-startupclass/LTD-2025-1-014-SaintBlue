# BackEnd/routes/dashboard.py
from flask import Blueprint, jsonify
from database import get_db_connection  # Importe de database.py

dashboard_bp = Blueprint('dashboard', __name__)

# Rota para dados do total de quantidade no estoque
@dashboard_bp.route('/total_quantidade_estoque', methods=['GET'])
def total_quantidade_estoque():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

        cur = conn.cursor()
        cur.execute("SELECT COALESCE(SUM(quantidade), 0) AS total_quantidade FROM estoque")
        total = cur.fetchone()[0]
        cur.close()
        conn.close()
        return jsonify({"total_quantidade": total})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para quantidade por produto
@dashboard_bp.route('/quantidade_por_produto', methods=['GET'])
def quantidade_por_produto():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

        cur = conn.cursor()
        cur.execute("""
            SELECT TRIM(LOWER(produto)) AS nome_produto, SUM(quantidade)
            FROM estoque
            GROUP BY nome_produto
            ORDER BY nome_produto
        """)
        dados = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify([{"produto": nome.capitalize(), "quantidade": qtd} for nome, qtd in dados])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para produtos por marca
@dashboard_bp.route('/produtos_por_marca', methods=['GET'])
def produtos_por_marca():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT marca, COUNT(*) FROM estoque GROUP BY marca")
        dados = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify([{"marca": d[0], "total": d[1]} for d in dados])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para quantidade por condição
@dashboard_bp.route('/quantidade_por_condicao', methods=['GET'])
def quantidade_por_condicao():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT condicao, SUM(quantidade) FROM estoque GROUP BY condicao")
        dados = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify([{"condicao": d[0], "quantidade": d[1]} for d in dados])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Nova rota para valor total em estoque
@dashboard_bp.route('/valor_total_estoque', methods=['GET'])
def valor_total_estoque():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

        cur = conn.cursor()
        cur.execute("SELECT COALESCE(SUM(preco * quantidade), 0) AS valor_total FROM estoque")
        valor_total = cur.fetchone()[0]
        cur.close()
        conn.close()
        return jsonify({"valor_total": valor_total})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Nova rota para ruptura de estoque (exemplo simplificado)
@dashboard_bp.route('/ruptura_estoque', methods=['GET'])
def ruptura_estoque():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

        cur = conn.cursor()
        cur.execute("""
            SELECT 
                COUNT(*) * 100.0 / (SELECT COUNT(*) FROM estoque) AS ruptura
            FROM estoque
            WHERE quantidade = 0
        """)
        ruptura = cur.fetchone()[0] or 0
        cur.close()
        conn.close()
        return jsonify({"ruptura": f"{ruptura:.2f}%"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Rota para valor total em estoque por marca
@dashboard_bp.route('/valor_estoque_por_marca', methods=['GET'])
def valor_estoque_por_marca():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

        cur = conn.cursor()
        cur.execute("""
            SELECT 
                marca,
                COALESCE(SUM(preco * quantidade), 0) AS valor_total
            FROM estoque
            GROUP BY marca
            ORDER BY valor_total DESC
        """)
        dados = cur.fetchall()
        cur.close()
        conn.close()

        # Converter para JSON, limitando a 4 marcas mais representativas (ajustável)
        chart_data = [{"marca": d[0] or "Sem Marca", "valor_total": float(d[1])} for d in dados[:4]]
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500