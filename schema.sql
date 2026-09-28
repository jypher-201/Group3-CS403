CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS anime (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    series VARCHAR(255) NOT NULL,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO anime (name, series)
SELECT * FROM (VALUES
    ('Monkey D. Luffy', 'One Piece'),
    ('Ichigo Kurosaki', 'Bleach'),
    ('Tanjiro Kamado', 'Demon Slayer')
) AS seed(name, series)
WHERE NOT EXISTS (SELECT 1 FROM anime);