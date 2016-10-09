print '\nStarting server'

from server import server

if __name__ == '__main__':
    server.run(port=server.config['PORT'], debug=server.config['DEBUG'])
