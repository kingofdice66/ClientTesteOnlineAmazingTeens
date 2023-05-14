CREATE TABLE subsections(
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    section_id BIGINT NOT NULL,
        CONSTRAINT fk_sections
        FOREIGN KEY(section_id)
        REFERENCES sections(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    created_by BIGINT NOT NULL,
        CONSTRAINT fk_users
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
)