import flask
import os
env = os.environ.get('env').strip()

blueprint = flask.Blueprint('home_blueprint', __name__)

@blueprint.route('/')
def home():
    if env == "dev":
        page = "dev.html"
    else:
        page = "prod.html"

    return flask.render_template(page)
