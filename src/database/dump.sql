/********** TABLES **********/

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    email_confirmation BOOLEAN,
    password VARCHAR(32),
    phone_number VARCHAR(20) UNIQUE,
    phone_number_confirmation BOOLEAN,
    plan varchar(10),
    goal varchar(20),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE tokens (
    id SERIAL,
    token_type varchar(10),
    users_fk INT,
    date TIMESTAMP,
    token VARCHAR(36) UNIQUE,
    CONSTRAINT tokens_pk PRIMARY KEY (id)
);

CREATE TABLE categories (
    id SERIAL,
    transaction_type varchar(20),
    users_fk INT,
    name VARCHAR(100) UNIQUE,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE subcategories (
    id SERIAL,
    categories_fk INT,
    costing varchar(10),
    name VARCHAR(100),
    CONSTRAINT subcategories_pk PRIMARY KEY (id),
    UNIQUE (categories_fk, name)
);

CREATE TABLE transactions (
    id SERIAL,
    transaction_type varchar(20),
    categories_fk INT,
    subcategories_fk INT,
    action varchar(10),
    transaction_date TIMESTAMP,
    value FLOAT,
    observation VARCHAR(100),
    date TIMESTAMP,
    CONSTRAINT transactions_pk PRIMARY KEY (id)
);

/********** FOREIGN KEY CONSTRAINTS **********/

ALTER TABLE tokens ADD CONSTRAINT tokens_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE categories ADD CONSTRAINT categories_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE subcategories ADD CONSTRAINT subcategories_categories_fk FOREIGN KEY (categories_fk) REFERENCES categories(id);

ALTER TABLE transactions ADD CONSTRAINT transactions_categories_fk FOREIGN KEY (categories_fk) REFERENCES categories(id);

ALTER TABLE transactions ADD CONSTRAINT transactions_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);

