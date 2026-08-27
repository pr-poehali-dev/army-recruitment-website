CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    region VARCHAR(255),
    comment TEXT,
    source VARCHAR(50) DEFAULT 'form',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_applications_created_at ON applications(created_at);
