CREATE TABLE topics(
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_by BIGINT NOT NULL,
        constraint fk_users
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    section_id BIGINT NOT NULL,
        CONSTRAINT fk_sections
        FOREIGN KEY(section_id)
        REFERENCES sections(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    subsection_id BIGINT NOT NULL,
        CONSTRAINT fk_subsections
        FOREIGN KEY(subsection_id)
        REFERENCES subsections(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
)