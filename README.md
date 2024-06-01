[todo app.webm](https://github.com/MahmoudEl3bady/to-do-app/assets/113212468/a2899ad0-bdc4-434e-a119-7c93877ed4eb)

# Full-Stack Todo App

This is a full-stack todo application built using Flask (python) and MySQL RDBMS for the backend and React.Js for the frontend

## Features

- User registration and authentication using JWT (JSON Web Token ).
- Forms validation using <a href="https://formik.org/" target="_blank" >Formik</a> and <a href="https://www.npmjs.com/package/yup" target="_blank" >Yup</a> for seamless data entry.
- Adding, viewing, modifying, and deleting tasks.
- State management using Context API and Redux-toolkit 
- Dark and light theme toggling.
- Integration with backend API for task management.
- Hide completed tasks to focus on what's important.
- Responsive design : view the optimal layout depending on your device's screen size.
- Accessibility features implemented to ensure inclusivity.

## Technologies Used

### Frontend
- React.js
- Redux-tookit
- React Router 
- Bootstrap
- CSS
- Formik and Yup 

### Backend

- **Flask**: Micro web framework written in Python for building web applications.
- **Flask-CORS**: Flask extension for handling Cross-Origin Resource Sharing (CORS), allowing frontend and backend to communicate with each other.
- **Flask-MySQLdb**: Flask extension for MySQL database integration.
- **Flask-JWT-Extended**: Flask extension for JSON Web Token (JWT) authentication.

## Setup

<h4>Make sure you have Nodejs, npm,python3 and mysql Installed. </h4>

1.**Clone the repository:**

```bash
git clone https://github.com/MahmoudEl3bady/to-do-app.git
```

2.**Install React dependanices :**

```bash
cd to-do-app && npm install
```

3.**Install Flask Requirements :**

```bash
pip install Flask Flask-CORS Flask-MySQLdb Flask-JWT-Extended
```

4.**Create the Database:**

```sql
 CREATE DATABASE Todo;
 CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    body TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

```

6.**Start the flask server :**

```bash
npm run api
```

7.**Start the react server :**

```bash
npm run dev
```
