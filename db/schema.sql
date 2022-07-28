DROP DATABASE IF EXISTS personelle_db;
CREATE DATABASE personelle_db;

USE personelle_db;

CREATE TABLE departments (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id),
  REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
  FOREIGN KEY (role_id),
  REFERENCES role(id),
  PRIMARY KEY id,
  FOREIGN KEY (manager_id),
  REFERENCES employee(id),
  ON DELETE SET NULL
);
