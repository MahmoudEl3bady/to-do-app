from flask import Flask, jsonify,request,session , redirect
from flask_cors import CORS
from flask_mysqldb import MySQL


app = Flask(__name__)
CORS(app)




# Set the secret key to enable session cookies
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'



# Database Configuration

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'Todo'

mysql = MySQL(app)


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        try:
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
            mysql.connection.commit()
            cur.close()
            # Retrieve user ID after insertion
            cur = mysql.connection.cursor()
            cur.execute(f"SELECT id FROM users WHERE username ='{username}'")
            user_id = cur.fetchone()[0]
            cur.close()
            # Set session data for the newly registered user
            session['user_id'] = user_id
            session['username'] = username
            return jsonify(registerSuccess=True, message=f"Registration successful, welcome {username}!", username=username, user_id=user_id)
        except Exception as e:
            return jsonify(registerSuccess=False, message=f"An error occurred during registration: {str(e)}"), 500



@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        try:
            cur = mysql.connection.cursor()
            cur.execute(f"SELECT id, username, email, password FROM users WHERE email='{email}' AND password='{password}'")
            user_data = cur.fetchall()
            if user_data:
                session['user_id'] = user_data[0][0]
                session['username'] = user_data[0][1]
                print(session['user_id'])
                return jsonify(loginSuccess=True, message=f"Welcome, {session['username']}!",username = session['username'],user_id = session['user_id'])
            else:
                return jsonify(loginSuccess=False, message="Login failed, please try again."), 401
        except Exception as e:
            return jsonify(loginSuccess=False, message=f"An error occurred: {str(e)}"), 500


@app.route('/logout')
def logout():
    session.pop("username",None)

@app.route('/current_user')
def current_user():
    print(session)
    return ({"user_id":session['user_id'],"username":session['username']});


@app.route('/tasks',methods=['GET'])
def show_tasks():
    cur = mysql.connection.cursor()
    # print(session['user_id'])
    cur.execute(f"SELECT * FROM tasks")
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

@app.route('/tasks',methods = ["POST"])
def add_task():
  if request.method=='POST':
        data = request.get_json()
        adding_task_input = data['body']
        try:
            cur = mysql.connection.cursor()
            print(adding_task_input)
            print(session['user_id'])
            cur.execute("INSERT INTO tasks (user_id,body) Values(%s,%s)",(session['user_id'],adding_task_input))
            mysql.connection.commit()
            cur.close()
            return 'User Added successfully !'
        except Exception as e :
            return f"An Error occurred: {str(e)}"



app.debug = True
