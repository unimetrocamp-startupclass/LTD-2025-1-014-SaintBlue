# BackEnd/database.py
import psycopg2
from config import DATABASE

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=DATABASE['dbname'],
            user=DATABASE['user'],
            password=DATABASE['password'],
            host=DATABASE['host'],
            port=DATABASE['port']
        )
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None