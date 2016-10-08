import config
import controllers
import flask
import os
from models.model_helper import ModelHelper

# @TODO@mattbillard finish
# app = flask.Flask(__name__, template_folder='templates', static_url_path="", static_folder="static/dev")
app = flask.Flask(__name__, template_folder='templates', static_url_path="", static_folder="static/prod")


app.config.update(dict(
    DATABASE=os.path.join(app.root_path, '../data/stocks.db'),
    DEBUG=True,
    PORT=5000,
    SECRET_KEY='\x17\x96e\x94]\xa0\xb8\x1e\x8b\xee\xdd\xe9\x91^\x9c\xda\x94\t\xe8S\xa1Oe_',
    USERNAME='web',
    PASSWORD='site'
))
app.config.from_envvar('CONFIG', silent=True)


@app.teardown_appcontext
def close_db(error):
    ModelHelper.close_db()


app.register_blueprint(controllers.home.blueprint)
app.register_blueprint(controllers.stocks.blueprint)

ModelHelper.init_db_if_empty()
