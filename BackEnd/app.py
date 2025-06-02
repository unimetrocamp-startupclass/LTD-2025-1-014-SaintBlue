# BackEnd/app.py
from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.estoque import estoque_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)

# Definir a chave secreta para codificar e decodificar o JWT
app.config['SECRET_KEY'] = 'sua_chave_secreta'

# Habilitar CORS para a aplicação inteira
CORS(app)

# Registrar os blueprints (rotas)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(estoque_bp, url_prefix='/estoque')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)