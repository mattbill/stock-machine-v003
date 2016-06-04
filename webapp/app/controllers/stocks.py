import flask
from app import models
import json


blueprint = flask.Blueprint('data_blueprint', __name__)


@blueprint.route('/api/stocks/from-database/<symbol>', methods=['GET'])
def get_stock_from_db(symbol):
    stock_obj = models.stocks.get_stock_from_db(symbol)
    return flask.jsonify(stock_obj)


@blueprint.route('/api/stocks/redo-calcs/', methods=['POST'])
def redo_calcs():
    json_obj = json.loads(flask.request.data)
    stock_obj = models.stocks.redo_calcs(json_obj)
    return flask.jsonify(stock_obj)


@blueprint.route('/api/stocks/search/', methods=['POST'])
def search_data_table():
    where_cond = flask.request.json['whereCond']
    stocks = models.stocks.search_data_table(where_cond)
    return flask.jsonify(stocks)


@blueprint.route('/api/stocks/automate/', methods=['GET'])
def automate_next_stock():
    symbol = models.stocks.automate_next_stock()
    return symbol
