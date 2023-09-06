CREATE TABLE courses(
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content JSON,
    show BOOLEAN DEFAULT FALSE, -- Show the tutorial or not. For example, if the tutorial is being modified.
    created_by BIGINT NOT NULL,
        CONSTRAINT fk_users
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
)