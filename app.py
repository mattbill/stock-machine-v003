
import flask
app = flask.Flask(__name__)

@app.route('/')
def hello_world():
    # return flask.send_from_directory('static', 'index.html')
    return flask.render_template('index.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
