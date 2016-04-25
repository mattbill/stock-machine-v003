import flask
from app import models
import json


blueprint = flask.Blueprint('data_blueprint', __name__)


@blueprint.route('/data/get-stock-from-db/')
def get_stock_from_db():
    symbol = flask.request.args.get('symbol')
    stock_obj = models.data.get_stock_from_db(symbol)
    return flask.Response(stock_obj, mimetype='application/json')

@blueprint.route('/data/redo-calcs/', methods=['POST'])
def redo_calcs():
    json_obj = json.loads(flask.request.data)
    stock_obj = models.data.redo_calcs(json_obj)
    return flask.Response(json.dumps(stock_obj), mimetype='application/json')

@blueprint.route('/data/search-data-table/', methods=['POST'])
def search_data_table():
    stocks = models.data.search_data_table()
    return flask.Response(stocks, mimetype='application/json')

@blueprint.route('/data/automate-next-stock/')
def automate_next_stock():
    symbol = models.data.automate_next_stock()
    return symbol
