import flask

blueprint = flask.Blueprint('home_blueprint', __name__)


@blueprint.route('/')
def hello_world():
    return flask.render_template('index.html')
