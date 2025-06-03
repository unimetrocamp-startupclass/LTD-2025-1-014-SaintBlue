from flask import Flask
from routes.usuario_routes import usuario_bp
from routes.produto_routes import produto_bp
from routes.dashboard_routes import dashboard_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app) 

app.config['SECRET_KEY'] = 'sua_chave_secreta'

app.register_blueprint(usuario_bp)
app.register_blueprint(produto_bp)
app.register_blueprint(dashboard_bp)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5050,
        #ssl_context = ('/etc/ssl/server.crt', '/etc/ssl/server.key'),
        debug=True
    )
