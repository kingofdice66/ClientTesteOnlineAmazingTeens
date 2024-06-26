CREATE TABLE sections(
	id BIGSERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	created_by BIGINT NOT NULL,
		CONSTRAINT fk_users
		FOREIGN KEY(created_by)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
)