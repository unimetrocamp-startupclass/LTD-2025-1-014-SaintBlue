from db import get_db_connection

class Produto:
    def __init__(self, produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes=''):
        self.produto = produto
        self.preco = preco
        self.marca = marca
        self.cor = cor
        self.codigo = codigo
        self.quantidade = quantidade
        self.condicao = condicao
        self.peso = peso
        self.observacoes = observacoes

    def salvar(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO estoque (produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (self.produto, self.preco, self.marca, self.cor, self.codigo,
              self.quantidade, self.condicao, self.peso, self.observacoes))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def deletar(codigo):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM estoque WHERE codigo = %s", (codigo,))
        afetados = cursor.rowcount
        conn.commit()
        cursor.close()
        conn.close()
        return afetados

    @staticmethod
    def atualizar(codigo, dados):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE estoque SET produto=%s, preco=%s, marca=%s, cor=%s,
            quantidade=%s, condicao=%s, peso=%s, observacoes=%s
            WHERE codigo=%s
        """, (dados['produto'], dados['preco'], dados['marca'], dados['cor'],
              dados['quantidade'], dados['condicao'], dados['peso'],
              dados['observacoes'], codigo))
        afetados = cursor.rowcount
        conn.commit()
        cursor.close()
        conn.close()
        return afetados

    @staticmethod
    def listar_todos():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT produto, preco, marca, cor, codigo, quantidade, condicao, peso, observacoes FROM estoque")
        produtos = cursor.fetchall()
        cursor.close()
        conn.close()
        return produtos

    @staticmethod
    def buscar_por_codigo(codigo):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT codigo, condicao, cor, marca, peso, preco, quantidade, produto, observacoes
            FROM estoque WHERE codigo = %s
        """, (codigo,))
        row = cursor.fetchone()
        columns = [desc[0].strip() for desc in cursor.description]  # <<< limpa os nomes das colunas
        produto = dict(zip(columns, row)) if row else None
        cursor.close()
        conn.close()
        return produto