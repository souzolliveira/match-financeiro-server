/********** TABLES **********/

CREATE TABLE goals (
    id SERIAL,
    description VARCHAR(100),
    CONSTRAINT goals_pk PRIMARY KEY (id)
);

CREATE TABLE plans (
    id SERIAL,
    description varchar(20),
    CONSTRAINT plans_pk PRIMARY KEY (id)
);

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(100),
    email VARCHAR(100),
    email_confirmation BOOLEAN,
    password VARCHAR(32),
    phone_number VARCHAR(20),
    phone_number_confirmation BOOLEAN,
    plans_fk INT,
    goals_fk INT,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE token_types (
    id SERIAL,
    description VARCHAR(10),
    CONSTRAINT token_types_pk PRIMARY KEY (id)    
);

CREATE TABLE tokens (
    id SERIAL,
    token_types_fk INT,
    users_fk INT,
    date TIMESTAMP,
    value VARCHAR(36),
    CONSTRAINT tokens_pk PRIMARY KEY (id)
);

CREATE TABLE transaction_types (
    id SERIAL,
    description VARCHAR(100),
    signal VARCHAR(1),
    CONSTRAINT transaction_types_pk PRIMARY KEY (id)
);

CREATE TABLE categories (
    id SERIAL,
    description VARCHAR(100),
    transaction_types_fk INT,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE costing (
    id SERIAL,
    description VARCHAR(10),
    CONSTRAINT consting_pk PRIMARY KEY (id)
);

CREATE TABLE subcategories (
    id SERIAL,
    categories_fk INT,
    costing_fk INT,
    description VARCHAR(100),
    CONSTRAINT subcategories_pk PRIMARY KEY (id)
);

CREATE TABLE actions (
    id SERIAL,
    description VARCHAR(10),
    CONSTRAINT actions_pk PRIMARY KEY (id)
);

CREATE TABLE transactions (
    id SERIAL,
    users_fk INT, 
    subcategories_fk INT,
    actions_fk INT,
    transaction_date TIMESTAMP,
    value FLOAT,
    observation VARCHAR(100),
    date TIMESTAMP,
    CONSTRAINT transactions_pk PRIMARY KEY (id)
);

/********** FOREIGN KEY CONSTRAINTS **********/

ALTER TABLE users ADD CONSTRAINT users_goals_fk FOREIGN KEY (goals_fk) REFERENCES goals(id);

ALTER TABLE users ADD CONSTRAINT users_plans_fk FOREIGN KEY (plans_fk) REFERENCES plans(id);

ALTER TABLE tokens ADD CONSTRAINT tokens_token_types_fk FOREIGN KEY (token_types_fk) REFERENCES token_types(id);

ALTER TABLE tokens ADD CONSTRAINT tokens_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE categories ADD CONSTRAINT categories_transaction_types_fk FOREIGN KEY (transaction_types_fk) REFERENCES transaction_types(id);

ALTER TABLE subcategories ADD CONSTRAINT subcategories_categories_fk FOREIGN KEY (categories_fk) REFERENCES categories(id);

ALTER TABLE subcategories ADD CONSTRAINT subcategories_costing_fk FOREIGN KEY (costing_fk) REFERENCES costing(id);

ALTER TABLE transactions ADD CONSTRAINT transactions_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE transactions ADD CONSTRAINT transactions_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);

ALTER TABLE transactions ADD CONSTRAINT transactions_actions_fk FOREIGN KEY (actions_fk) REFERENCES actions(id);

/********** BASIC INSERTS **********/

INSERT INTO goals (description) VALUES ('SETTLE_DEBT'), ('START_SAVING'), ('START_INVESTING'), ('OPTIMIZE_INVESTMENT');

INSERT INTO plans (description) VALUES ('BASIC'), ('PREMIUM'), ('ADMIN');

INSERT INTO token_types (description) VALUES ('AUTH'), ('EMAIL'), ('PHONE');

INSERT INTO transaction_types (description, signal) VALUES ('INCOME', '+'), ('EXPENSE', '-'), ('INVESTIMENT', '-'), ('REDEMPTION', '+');

INSERT INTO categories (transaction_types_fk, description) VALUES 
(1, 'SALARY'), (1, 'LENDING'),
(2, 'FOOD'), (2, 'MARKETPLACE'), (2, 'DRINK'), 
(2, 'HOUSE'), (2, 'EDUCATION'), (2, 'LEISURE'),
(2, 'HEALTH'), (2, 'PETS'), (2, 'OUTFIT '),
(2, 'TRANSPORT'), (2, 'TRAVEL');

INSERT INTO costing (description) VALUES ('FIXED'), ('VARIABLE');

INSERT INTO actions (description) VALUES ('SYSTEM'), ('USER');
