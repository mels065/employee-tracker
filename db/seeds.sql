INSERT INTO departments (
    name
)
VALUES
    ("Laboratory"),
    ("Sales"),
    ("Engineering");


INSERT INTO roles (
    title,
    salary,
    department_id
)
VALUES
    ("Wumbologist", 200000, 1),
    ("Sales Manager", 70000, 2),
    ("Sales Associate", 50000, 2),
    ("Lead Engineer", 150000, 3),
    ("Software Engineer", 80000, 3);


INSERT INTO employees (
    first_name,
    last_name,
    role_id,
    manager_id
)
VALUES
    ("Patrick", "Star", 1, null),
    ("Larry", "Larrison", 2, null),
    ("Jim", "Halpert", 3, 2),
    ("Dwight", "Schrute", 3, 2),
    ("Alice", "Inwunderlind", 4, null),
    ("Rick", "Sanchez", 4, null),
    ("Mad", "Hatter", 5, 5),
    ("Morty", "Smith", 5, 6);
