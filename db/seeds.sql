INSERT INTO departments (department)
VALUES
	("Sales"),
    ("Engineering"),
    ("Finances"),
    ("Legal");
    
INSERT INTO roles (title, salary, department_id)
VALUES
	("Sales Lead", 60000, 1),
    ("Salesperson", 30000, 1),
    ("Lead Engineer", 90000, 2),
    ("Software Engineer", 50000, 2),
    ("Accountant", 60000, 3),
    ("Legal Team Lead", 80000, 4),
    ("Lawyer", 65000, 4);
    
INSERT INTO managers (manager)
VALUES
	("Ricardo Menendez"),
    ("Samantha Greenspirit"),
    ("Reese Tremble");
        
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
	("Ricardo", "Menendez", 1, null),
    ("Jorge", "Bolivar", 2, 1),
    ("Jack", "Tennison", 2, 1),
    ("Samantha", "Greenspirit", 3, null),
    ("Franz", "Holheim", 4, 2),
    ("Rachel", "McMurtry", 4, 2),
    ("Corey", "Trumb", 5, null),
    ("Reese", "Treble", 6, null),
    ("Kraig", "Luxembosh", 7, 3),
    ("Tallyrand", "Bigsby", 7, 3);
    
    
    