import flask
from app import models
import json


blueprint = flask.Blueprint('data_blueprint', __name__)


@blueprint.route('/data/get-stock-from-db/')
def get_stock_from_db():
    symbol = flask.request.args.get('symbol').upper()
    stock_obj = models.data.get_stock_from_db(symbol)
    return flask.jsonify(stock_obj)


@blueprint.route('/data/redo-calcs/', methods=['POST'])
def redo_calcs():
    json_obj = json.loads(flask.request.data)
    stock_obj = models.data.redo_calcs(json_obj)
    return flask.jsonify(stock_obj)


@blueprint.route('/data/search-data-table/', methods=['POST'])
def search_data_table():
    where_cond = flask.request.json['whereCond']
    stocks = models.data.search_data_table(where_cond)
    return flask.jsonify(stocks)


@blueprint.route('/data/automate-next-stock/')
def automate_next_stock():
    symbol = models.data.automate_next_stock()
    return symbol
