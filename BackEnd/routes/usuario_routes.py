from flask import Blueprint, request, jsonify
from models.usuario import Usuario
from utils.auth import gerar_token

usuario_bp = Blueprint('usuario', __name__)

@usuario_bp.route('/new_user', methods=['POST'])
def new_user():
    data = request.get_json()
    if not all(data.get(campo) for campo in ['nome', 'sobrenome', 'email', 'numero', 'senha']):
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    try:
        usuario = Usuario(**data)
        usuario.salvar()
        return jsonify({"message": "Usuário adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@usuario_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Usuario.autenticar(data['email'], data['senha'])
    if user:
        token = gerar_token(data['email'])  # <- aqui gera o token
        return jsonify({
            "message": "Login bem-sucedido",
            "token": token 
        }), 200
    else:
        return jsonify({"error": "Credenciais inválidas"}), 401

@usuario_bp.route('/user/<email>', methods=['GET'])
def get_user(email):
    user = Usuario.buscar_por_email(email)
    if user:
        return jsonify({
            "nome": user[0],
            "sobrenome": user[1],
            "email": user[2],
            "numero": user[3]
        }), 200
    else:
        return jsonify({"error": "Usuário não encontrado"}), 404