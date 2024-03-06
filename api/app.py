from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# TODO: Database Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'Todo'

mysql = MySQL(app)


@app.route('/tasks')
def show_tasks():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tasks')
    fetch_data = cur.fetchall()
    todos_list = []
    for row in fetch_data:
        todo = {
            'id': row[0],
            'user_id': row[1],
            'body': row[2],
            'is_completed': row[3]
        }
        todos_list.append(todo)
    
    # Convert the list of dictionaries to JSON and return it as a response
    return jsonify(todos_list)
