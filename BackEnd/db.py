import psycopg2
from config import Config

def get_db_connection():
    try:
        conn = psycopg2.connect(**Config.as_dict())
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None



