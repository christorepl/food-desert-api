DROP TABLE IF EXISTS user_saves;
CREATE TABLE user_saves (
    save_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    save_name VARCHAR(255) NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    modified TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fips TEXT NOT NULL,
    state_names TEXT NOT NULL
);
