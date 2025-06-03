from flask import Blueprint, jsonify
from models.dashboard import Dashboard

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard/quantidade_por_produto', methods=['GET'])
def rota_quantidade_por_produto():
    return Dashboard.quantidade_por_produto()

@dashboard_bp.route('/dashboard/produtos_por_marca', methods=['GET'])
def rota_produtos_por_marca():
    return Dashboard.produtos_por_marca()

@dashboard_bp.route('/dashboard/quantidade_por_condicao', methods=['GET'])
def rota_quantidade_por_condicao():
    return Dashboard.quantidade_por_condicao()

@dashboard_bp.route('/dashboard/quantidade_total', methods=['GET'])
def quantidade_total():
    try:
        total = Dashboard.quantidade_total_itens()
        return jsonify({"quantidade_total": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route('/dashboard/soma_precos', methods=['GET'])
def soma_precos():
    try:
        total = Dashboard.soma_total_precos()
        return jsonify({"soma_total_precos": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route('/dashboard/percentual_zerados', methods=['GET'])
def percentual_zerados():
    try:
        percentual = Dashboard.percentual_produtos_zerados()
        return jsonify({"percentual_zerados": percentual}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route('/dashboard/percentual_preco_por_marca', methods=['GET'])
def percentual_preco_por_marca():
    try:
        return Dashboard.percentual_preco_por_marca()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route('/dashboard/valor_em_estoque_por_produto', methods=['GET'])
def valor_em_estoque_por_produto():
    try:
        return Dashboard.valor_em_estoque_por_produto()
    except Exception as e:
        return jsonify({"error": str(e)}), 500