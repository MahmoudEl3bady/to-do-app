
# Full-Stack Todo App

This is a full-stack todo application built using Flask (python) and MySQL DBMS for the backend and React.Js for the frontend

## Features

- User registration and authentication using  JWT  (JSON Web Token ).
- Adding, viewing, modifying, and deleting tasks.
- Dark and light theme toggling.
- Integration with backend API for task management.
- Hide completed tasks to focus on what's important.
 - Responsive design : view the optimal layout depending on your device's screen size.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: DOM bindings for React Router, for routing in the application.
- **Bootstrap**: Front-end framework for developing responsive and mobile-first websites.
- **react-icons**: Library providing a collection of icons for React applications.

### Backend

- **Flask**: Micro web framework written in Python for building web applications.
- **Flask-CORS**: Flask extension for handling Cross-Origin Resource Sharing (CORS), allowing frontend and backend to communicate with each other.
- **Flask-MySQLdb**: Flask extension for MySQL database integration.
- **Flask-JWT-Extended**: Flask extension for JSON Web Token (JWT) authentication.

## Setup
<h4>Make sure you have Nodejs, npm,python3 and mysql Installed. </h4> 
1. **Clone the repository:**

```bash
git clone https://github.com/MahmoudEl3bady/to-do-app.git
```

2. **Install React dependanices :**

```bash
cd to-do-app && npm install 
```
3. **Install Flask Requirements :**

```bash
pip install Flask Flask-CORS Flask-MySQLdb Flask-JWT-Extended
```
4.  **Create a Database:** 
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
6. **Start the flask server :**

```bash
npm run api 
```
7. **Start the react server :**

```bash
npm run dev 
```



