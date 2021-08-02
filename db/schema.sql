-- \c mvp_project;
DROP TABLE IF EXISTS task;
CREATE TABLE task(
   task_id SERIAL PRIMARY KEY     NOT NULL,
   task_name              TEXT
);
