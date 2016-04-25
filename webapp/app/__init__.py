import flask
import config
import controllers

app = flask.Flask(__name__, template_folder='templates')

app.register_blueprint(controllers.data.blueprint)
app.register_blueprint(controllers.home.blueprint)
