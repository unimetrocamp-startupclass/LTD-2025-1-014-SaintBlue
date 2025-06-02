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
        return total or 0  # Evita None
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
        total = cursor.fetchone()[0] or 1  # Evita divisão por zero

        cursor.execute("SELECT COUNT(*) FROM estoque WHERE quantidade = 0")
        zerados = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        percentual = (zerados / total) * 100
        return round(percentual, 2)  # Duas casas decimais
    @staticmethod
    def percentual_preco_por_marca():
        conn = get_db_connection()
        cursor = conn.cursor()

        # Soma total dos preços
        cursor.execute("SELECT SUM(preco) FROM estoque")
        total = cursor.fetchone()[0] or 1  # evita divisão por zero

        # Soma dos preços por marca
        cursor.execute("""
            SELECT TRIM(LOWER(marca)) AS marca, SUM(preco)
            FROM estoque
            GROUP BY marca
        """)
        dados = cursor.fetchall()
        cursor.close()
        conn.close()

        # Converte para porcentagem
        resultado = [
            {"marca": marca.capitalize(), "percentual": round((soma / total) * 100, 2)}
            for marca, soma in dados
        ]
        return resultado

