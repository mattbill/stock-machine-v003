import flask

blueprint = flask.Blueprint('home_blueprint', __name__)


# @TODO@mattbillard finish

@blueprint.route('/')
def home():
#     return flask.render_template('dev.html')
    return flask.render_template('prod.html')


# @blueprint.route('/dev')
# def dev():
#     return flask.render_template('dev.html')
#
# @blueprint.route('/prod')
# def prod():
#     return flask.render_template('prod.html')
