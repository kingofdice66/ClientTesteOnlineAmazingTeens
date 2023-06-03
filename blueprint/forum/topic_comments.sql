CREATE TABLE topic_comments(
	id BIGSERIAL PRIMARY KEY,
	comment TEXT NOT NULL,
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
	topic_id BIGINT NOT NULL,
		CONSTRAINT fk_topics
		FOREIGN KEY(topic_id)
		REFERENCES topics(id)
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