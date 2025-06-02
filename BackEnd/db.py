import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}

def get_db_connection():
    try:
        conn = psycopg2.connect(**DATABASE)
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None
