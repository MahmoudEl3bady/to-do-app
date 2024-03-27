from flask import Flask, jsonify,request,session , redirect
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta

# Set the session lifetime to 30 minutes (1800 seconds)


app = Flask(__name__)
CORS(app)

app.config.from_object(__name__)



# Set the secret key to enable session cookies
app.config['JWT_SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/' 
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=1) 
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']  # Example: Look for tokens in headers and cookies

jwt = JWTManager(app)

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
            cur.execute(f"SELECT id FROM users WHERE username ='%s'",(username,))
            user_id = cur.fetchone()[0]
            cur.close()

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
            cur.execute("SELECT id, username, email, password FROM users WHERE email=%s AND password=%s", (email, password))
            user_data = cur.fetchall()
            cur.close()
          
            if user_data:
                access_token = create_access_token(identity=email)
                print()
                return jsonify(loginSuccess=True, message=f"Login Successfully",access_token=access_token)
            else:
                return jsonify(loginSuccess=False, message="Login failed, please try again."), 401
        except Exception as e:
            return jsonify(loginSuccess=False, message=f"An error occurred: {str(e)}"), 500

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# @app.route('/logout')
# @jwt_required()
# def logout():

@app.route('/me',methods=['GET'])
def current_user():
    try:
        username = session.get('username')
        return jsonify(user_id=session.get('user_id'), username=username)
    except KeyError:
        return jsonify(error="User not logged in"), 401

@app.route('/tasks', methods=['GET'])
@jwt_required()
def show_tasks():
    try:
        # Get the current user's email address from the JWT token
        current_user_email = get_jwt_identity()
        print(current_user_email)

        # Retrieve user ID from the database based on the email address
        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (current_user_email,))
        user_id = cur.fetchone()[0]
        cur.close()

        # Fetch tasks for the user using their user ID
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM tasks WHERE user_id = %s", (user_id,))
        fetch_data = cur.fetchall()
        cur.close()

        # Construct a list of tasks
        tasks_list = []
        for row in fetch_data:
            task = {    
                'id': row[0],
                'user_id': row[1],
                'body': row[2],
                'is_completed': row[3]
            }
            tasks_list.append(task)

        # Return the list of tasks as JSON response
        return jsonify(tasks_list), 200

    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    body = data.get('addTask')
    try:
        current_user_email = get_jwt_identity()
        print(current_user_email)

        # Retrieve user ID from the database based on the email address
        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (current_user_email,))
        user_id = cur.fetchone()[0]
        cur.close()
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO tasks (user_id, body, is_completed) VALUES (%s, %s, %s)", (user_id, body, False))
        mysql.connection.commit()
        task_id = cur.lastrowid  # Get the last inserted id
        cur.close()
        return jsonify(success=True, message="Task added successfully", task=body, id=task_id)
    except Exception as e:
        return jsonify(success=False, message=f"An error occurred: {str(e)}"), 500


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        # Open a new cursor for selecting IDs
        cur = mysql.connection.cursor()
        # Execute a parameterized query to fetch all IDs
        cur.execute("SELECT id FROM tasks WHERE id = %s", (id,))
        task_id = cur.fetchone()
        # Close the cursor after use
        cur.close()
        
        # Check if the task ID exists
        if task_id:
            # Open a new cursor for the DELETE operation
            cur = mysql.connection.cursor()
            # Execute a parameterized query to delete the specific task
            cur.execute("DELETE FROM tasks WHERE id = %s", (id,))
            # Commit the transaction to save changes
            mysql.connection.commit()
            # Close the cursor
            cur.close()
            return jsonify(success=True, message="Task Deleted Successfully"), 200
        else:
            return jsonify(success=False, message="Task not found"), 404
        
    except Exception as e:
        # Make sure to close the cursor here if an error occurs before closing it
        cur.close()
        return jsonify(success=False, message=f"An error occurred: {str(e)}"), 500



@app.route('/tasks/<int:id>',methods=['PATCH'])
def modify_task(id):
    try:
        data = request.get_json()
        new_body = data.get("new_body")
        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM tasks WHERE id = %s",(id,))
        task_id = cur.fetchone()
        cur.close()

        if task_id:
            cur  =mysql.connection.cursor()
            cur.execute("UPDATE tasks SET body = %s WHERE id = %s",(new_body,task_id))
            mysql.connection.commit()
            cur.close()
            return jsonify(success=True, message="Task Updated Successfully",task=new_body,id=task_id), 200
        else:
            return jsonify(success=False, message="Task not found"), 404            
    except Exception as e:
        cur.close()
        return jsonify(success=False, message=f"An error occurred: {str(e)}"), 500








# ==========Display All the EndPoints============== 


def get_endpoints():
    endpoints = []
    for rule in app.url_map.iter_rules():
        # Exclude the default static route
        if not str(rule).startswith('/static'):
            endpoints.append({
                'url': str(rule),
                'methods': ','.join(rule.methods),
                'endpoint': rule.endpoint
            })
    return endpoints

# Route to display all endpoints
@app.route('/routes')
def list_endpoints():
    endpoints = get_endpoints()
    return {'endpoints': endpoints}





app.debug = True
