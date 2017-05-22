--  Insert into users TABLE
INSERT INTO users (username, password, email, phone, zipcode, createdAt, updatedAt)
VALUES('Test1', 'testing123', 'test1@gmail.com', '3210034571', '32819', current_timestamp, current_timestamp );

INSERT INTO users (username, password, email, phone, zipcode, createdAt, updatedAt)
VALUES('Test2', 'testing223', 'test2@gmail.com', '3210038812', '32835', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP );

INSERT INTO users (username, password, email, phone, zipcode, createdAt, updatedAt)
VALUES('Test3', 'testing323', 'test3@yahoo.com', '4070038812', '32839', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP );

--Insert into Posts Table
INSERT INTO posts (title, description, isactive, hashelpers, createdAt, updatedAt, userid)
VALUES('House Cleaning', 'Help needed for deep cleaning on May 23rd', '1', '1', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP, '3' );

INSERT INTO posts (title, description, isactive, hashelpers, createdAt, updatedAt, userid)
VALUES('Dog sitting', 'Dog sitter needed for Saturday night. Animals lover a must!!! ', '1', '0', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP, '1' );

-- Insert into Helpers Table
INSERT INTO helpers (ratings, createdAt, updatedAt, postId, userid)
VALUES('4', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP , '3', '3' );