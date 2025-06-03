from db import get_db_connection

class Usuario:
    def __init__(self, nome, sobrenome, email, numero, senha):
        self.nome = nome
        self.sobrenome = sobrenome
        self.email = email
        self.numero = numero
        self.senha = senha

    def salvar(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO usuarios (nome, sobrenome, email, numero, senha)
            VALUES (%s, %s, %s, %s, %s)
        """, (self.nome, self.sobrenome, self.email, self.numero, self.senha))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def autenticar(email, senha):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE email = %s AND senha = %s", (email, senha))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return user

    @staticmethod
    def buscar_por_email(email):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT nome, sobrenome, email, numero FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return user