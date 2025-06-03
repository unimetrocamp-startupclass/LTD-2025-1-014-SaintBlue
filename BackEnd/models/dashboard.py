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
    @staticmethod
    def quantidade_total_itens():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT SUM(quantidade) FROM estoque")
        total = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return total or 0  
    @staticmethod
    def soma_total_precos():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT SUM(preco * quantidade) FROM estoque")
        total = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return float(total) if total else 0.0
    @staticmethod
    def percentual_produtos_zerados():
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM estoque")
        total = cursor.fetchone()[0] or 1 

        cursor.execute("SELECT COUNT(*) FROM estoque WHERE quantidade = 0")
        zerados = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        percentual = (zerados / total) * 100
        return round(percentual, 2)  
    @staticmethod
    def percentual_preco_por_marca():
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT SUM(preco) FROM estoque")
        total = cursor.fetchone()[0] or 1  

        cursor.execute("""
            SELECT TRIM(LOWER(marca)) AS marca, SUM(preco)
            FROM estoque
            GROUP BY marca
            ORDER BY SUM(preco) DESC
        """)
        dados = cursor.fetchall()
        cursor.close()
        conn.close()

        resultado = [
        {"marca": marca.capitalize() or "Sem Marca", "valor_total": round(soma, 2)}
        for marca, soma in dados
        ]
        return jsonify(resultado)
    @staticmethod
    def valor_em_estoque_por_produto():
        try:
            conn = get_db_connection()
            if conn is None:
                return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

            cur = conn.cursor()
            cur.execute("""
                SELECT TRIM(LOWER(produto)) AS nome_produto, SUM(preco * quantidade) AS valor_total
                FROM estoque
                GROUP BY nome_produto
                ORDER BY valor_total DESC
            """)
            dados = cur.fetchall()
            cur.close()
            conn.close()

            resultado = [
                {"name": nome.capitalize(), "value": float(valor_total) or 0.0}
                for nome, valor_total in dados
            ]
            return jsonify(resultado), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
