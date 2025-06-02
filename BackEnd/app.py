from flask import Flask, request, jsonify
import psycopg2
import jwt
import datetime
from flask_cors import CORS 
from dotenv import load_dotenv
from dashboard import Dashboard
from usuario import Usuario
from produto import Produto


app = Flask(__name__)

# Definir a chave secreta para codificar e decodificar o JWT
app.config['SECRET_KEY'] = 'sua_chave_secreta'

# Habilitar CORS para a aplicação inteira
CORS(app)

load_dotenv()

# Função para gerar um token JWT
def gerar_token(email):
    try:
        # Cria o payload com o e-mail e a expiração do token (1 hora)
        payload = {
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        # Gera o token JWT
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        return token
    except Exception as e:
        print(f"Erro ao gerar token: {e}")
        return None

# Rota para cadastrar um novo usuário
@app.route('/new_user', methods=['POST'])
def new_user():
    data = request.get_json()
    if not all(data.get(campo) for campo in ['nome', 'sobrenome', 'email', 'numero', 'senha']):
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    try:
        usuario = Usuario(
            nome=data['nome'],
            sobrenome=data['sobrenome'],
            email=data['email'],
            numero=data['numero'],
            senha=data['senha']
        )
        usuario.salvar()
        return jsonify({"message": "Usuário adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Rota de login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Usuario.autenticar(data['email'], data['senha'])
    if user:
        return jsonify({"message": "Login bem-sucedido"}), 200
    else:
        return jsonify({"error": "Credenciais inválidas"}), 401


# Rota de perfil
@app.route('/user/<email>', methods=['GET'])
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
# Rota para cadastrar um produto no estoque
@app.route('/estoque/cadastrar', methods=['POST'])
def adicionar_produto():
    data = request.get_json()
    try:
        produto = Produto(
            produto=data['produto'],
            preco=data['preco'],
            marca=data['marca'],
            cor=data['cor'],
            codigo=data['codigo'],
            quantidade=data['quantidade'],
            condicao=data['condicao'],
            peso=data['peso'],
            observacoes=data.get('observacoes', '')
        )
        produto.salvar()
        return jsonify({"message": "Produto adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para deletar um produto do estoque
@app.route('/estoque/deletar/<codigo>', methods=['DELETE'])
def deletar_produto(codigo):
    try:
        deletados = Produto.deletar(codigo)
        if deletados:
            return jsonify({"message": "Produto deletado com sucesso"}), 200
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Rota para editar um produto do estoque
@app.route('/estoque/editar/<codigo>', methods=['PUT'])
def editar_produto(codigo):
    data = request.get_json()
    try:
        atualizados = Produto.atualizar(codigo, data)
        if atualizados:
            return jsonify({"message": "Produto atualizado com sucesso"}), 200
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para listar todos os produtos no estoque
@app.route('/estoque/listar', methods=['GET'])
def listar_produtos():
    try:
        produtos = Produto.listar_todos()
        return jsonify([{
            "produto": p[0], "preco": p[1], "marca": p[2], "cor": p[3],
            "codigo": p[4], "quantidade": p[5], "condicao": p[6], "peso": p[7], "observacoes": p[8]
        } for p in produtos]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Rota para listar o produto pelo codigo    
@app.route('/estoque/produto/<codigo>', methods=['GET'])
def buscar_produto(codigo):
    try:
        produto = Produto.buscar_por_codigo(codigo)
        if produto:
            return jsonify(produto), 200 
        else:
            return jsonify({"error": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#Rota para listar a quantidade de produtos    
@app.route('/dashboard/quantidade_por_produto', methods=['GET'])
def rota_quantidade_por_produto():
    return Dashboard.quantidade_por_produto()

#Rota para listar a quantidade de produtos por marca
@app.route('/dashboard/produtos_por_marca', methods=['GET'])
def rota_produtos_por_marca():
    return Dashboard.produtos_por_marca()

#Rota para listar a quantidade de produtos por condicao
@app.route('/dashboard/quantidade_por_condicao', methods=['GET'])
def rota_quantidade_por_condicao():
    return Dashboard.quantidade_por_condicao()

@app.route('/dashboard/quantidade_total', methods=['GET'])
def quantidade_total():
    try:
        total = Dashboard.quantidade_total_itens()
        return jsonify({"quantidade_total": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/dashboard/soma_precos', methods=['GET'])
def soma_precos():
    try:
        total = Dashboard.soma_total_precos()
        return jsonify({"soma_total_precos": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/dashboard/percentual_zerados', methods=['GET'])
def percentual_zerados():
    try:
        percentual = Dashboard.percentual_produtos_zerados()
        return jsonify({"percentual_zerados": percentual}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/dashboard/percentual_preco_por_marca', methods=['GET'])
def percentual_preco_por_marca():
    try:
        dados = Dashboard.percentual_preco_por_marca()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
app.run(
    host='0.0.0.0',
    port=5050,
    #ssl_context = ('/etc/ssl/server.crt', '/etc/ssl/server.key'),
    debug=True
)
