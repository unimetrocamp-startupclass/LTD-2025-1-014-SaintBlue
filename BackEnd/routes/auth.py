# BackEnd/routes/auth.py
from flask import Blueprint, request, jsonify, current_app
import jwt
import datetime
from database import get_db_connection  # Importe de database.py

auth_bp = Blueprint('auth', __name__)

# Função para gerar um token JWT
def gerar_token(email):
    try:
        payload = {'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}
        return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    except Exception as e:
        print(f"Erro ao gerar token: {e}")
        return None

# Rota para cadastrar um novo usuário
@auth_bp.route('/new_user', methods=['POST'])
def new_user():
    if not request.is_json:
        return jsonify({"error": "Content-Type deve ser application/json"}), 415

    data = request.get_json()
    nome = data.get('nome')
    sobrenome = data.get('sobrenome')
    email = data.get('email')
    numero = data.get('numero')
    senha = data.get('senha')

    if not all([nome, sobrenome, email, numero, senha]):
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Não foi possível conectar ao banco de dados"}), 500

        cursor = conn.cursor()
        query = "INSERT INTO usuarios (nome, sobrenome, email, numero, senha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (nome, sobrenome, email, numero, senha))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Usuário adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota de login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if not all([email, senha]):
        return jsonify({"error": "E-mail e senha são obrigatórios"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM usuarios WHERE email = %s AND senha = %s"
        cursor.execute(query, (email, senha))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            token = gerar_token(email)
            return jsonify({"message": "Login bem-sucedido", "token": token}), 200
        else:
            return jsonify({"error": "Credenciais inválidas"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota de perfil
@auth_bp.route('/perfil', methods=['GET'])
def perfil():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({"error": "Token não fornecido"}), 401

    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        email = payload['email']

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT nome, sobrenome, email, numero FROM usuarios WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            usuario_data = {"nome": user[0], "sobrenome": user[1], "email": user[2], "numero": user[3]}
            return jsonify({"perfil": usuario_data}), 200
        else:
            return jsonify({"error": "Usuário não encontrado"}), 404
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 401