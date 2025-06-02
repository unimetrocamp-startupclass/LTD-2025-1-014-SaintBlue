import os

DATABASE = {
    'dbname': 'saintblue',
    'user': 'postgres',
    'password': os.environ.get('DB_PASSWORD', 'senha_padrao'),
    'host': 'localhost',
    'port': '5432'
}