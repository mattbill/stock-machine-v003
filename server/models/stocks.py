import datetime
import json
from model_helper import ModelHelper


def get_stock_from_db(symbol):
    results = ModelHelper.fetchone('''
       SELECT allInfoAsJson
           FROM stocks
           WHERE symbol=?;
       ''', (symbol,))
    stock_obj = json.loads(results['allInfoAsJson'])
    return stock_obj


def redo_calcs(json_obj):
    stock_obj = json_obj['stockObj']
    return stock_obj


def search_data_table(where_cond):
    where_cond = 'WHERE ' + where_cond if where_cond != '' else ''
    stocks = ModelHelper.fetchall('''
        SELECT *
            FROM stocks
            %s
            LIMIT 999;
     ''' % where_cond)
    return stocks


def automate_next_stock():
    stock = ModelHelper.fetchone('''
        SELECT stockId, symbol, dateAutomated
        FROM stocks
        ORDER BY dateAutomated
        LIMIT 1
    ''', None)

    now = datetime.datetime.now()
    ModelHelper.execute('''
        UPDATE stocks
        SET dateAutomated=?
        WHERE stockId=?
    ''', (now, stock.get('stockId')))

    return stock.get('symbol')
