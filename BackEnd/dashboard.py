from flask import jsonify
from db import get_db_connection  

class Dashboard:
    @staticmethod
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
                ORDER BY nome_produto;
            """)
            dados = cur.fetchall()
            cur.close()
            conn.close()

            return jsonify([
                {"produto": nome.capitalize(), "quantidade": qtd} for nome, qtd in dados
            ])
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def produtos_por_marca():
        try:
            conn = get_db_connection()
            cur = conn.cursor()

            cur.execute("""
                SELECT marca, COUNT(*) 
                FROM estoque 
                GROUP BY marca
            """)
            dados = cur.fetchall()

            cur.close()
            conn.close()

            return jsonify([{"marca": d[0], "total": d[1]} for d in dados])
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def quantidade_por_condicao():
        try:
            conn = get_db_connection()
            cur = conn.cursor()

            cur.execute("""
                SELECT condicao, SUM(quantidade) 
                FROM estoque 
                GROUP BY condicao
            """)
            dados = cur.fetchall()

            cur.close()
            conn.close()

            return jsonify([{"condicao": d[0], "quantidade": d[1]} for d in dados])
        except Exception as e:
            return jsonify({"error": str(e)}), 500
