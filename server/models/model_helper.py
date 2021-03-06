import server
import flask
import os
import sqlite3


class ModelHelper:
    def __init__(self):
        pass

    @staticmethod
    def close_db():
        if hasattr(flask.g, 'sqlite_db'):
            flask.g.sqlite_db.close()


    @staticmethod
    def connect_db():
        rv = sqlite3.connect(server.server.config['DATABASE'])
        rv.row_factory = sqlite3.Row
        return rv


    @staticmethod
    def get_db():
        if not hasattr(flask.g, 'sqlite_db'):
            flask.g.sqlite_db = ModelHelper.connect_db()
        return flask.g.sqlite_db


    @staticmethod
    def execute(query, args=None):
        db = ModelHelper.get_db()
        cur = db.cursor()
        cur.execute(query, args) if args else cur.execute(query)
        db.commit()
        return


    @staticmethod
    def fetchall(query):
        db = ModelHelper.get_db()
        cur = db.execute(query)
        rows = cur.fetchall()
        results = ModelHelper.rows_to_array(rows)
        return results


    @staticmethod
    def fetchone(query, args=None):
        db = ModelHelper.get_db()
        cur = db.execute(query, args) if args else db.execute(query)
        row = cur.fetchone()
        results = ModelHelper.row_to_dicts(cur, row)
        return results


    @staticmethod
    def init_db_if_empty():
        try:
            db = ModelHelper.connect_db()
            db.execute('SELECT * FROM stocks LIMIT 1')

        except:
            print('Initializing DB')
            db = ModelHelper.connect_db()

            schema = os.path.join(server.server.root_path, '../data/schema_stocks.sql')
            with server.server.open_resource(schema, mode='r') as f:
                db.cursor().executescript(f.read())
            db.commit()

            data = os.path.join(server.server.root_path, '../data/data_stocks.sql')
            with server.server.open_resource(data, mode='r') as f:
                db.cursor().executescript(f.read())
            db.commit()

            print 'Database initialized'


    @staticmethod
    def row_to_dicts(cur, row):
        return dict((cur.description[idx][0], value)
                    for idx, value in enumerate(row))


    @staticmethod
    def rows_to_array(rows):
        return [dict(ix) for ix in rows]

