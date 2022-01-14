-- Users table seeds here (Example)
INSERT INTO users (user_name, email, password) VALUES
('Bob', 'bob.bob@gmail.com', 'password'),
('Peter', 'peter@gmail.com', 'password'),
('Susan', 'susan.1@mail.com', 'password'),
('Nona', 'noni.nona22@gmail.com', 'password'),
('Sam', 'sam56gh@yahoo.com', 'password'),
('Dominique', 'dominique56@gmail.com', 'password'),
('Alex', 'alexalex5@icloud.com', 'password'),
('Donna', 'myspot45@gmail.com', 'password'),
('Gleb', 'funnybunny14@gmail.com', 'password'),
('Alison', 'alisinburrows3@mail.com', 'password');

INSERT INTO categories (name) VALUES
('health'),
('sport'),
('web development'),
('travel'),
('cooking'),
('hobbies'),
('finance');

INSERT INTO resources (user_id, category_id, title, description, url ) VALUES
(1, 1, 'Healthy Living Guide', 'A great resource to produce powerful ideas that improve the lives and health of people everywhere', 'https://www.hsph.harvard.edu/nutritionsource/2021/01/19/healthy-living-guide-2020-2021/'),
(2, 2, 'Yoga Basics', 'Yoga lessons for beginners', 'https://www.yogabasics.com/'),
(3, 3, 'NodeJs', 'NodeJs basics and documentation', 'https://nodejs.dev/learn'),
(4, 3, 'Ajax', 'Ajax tutorial', 'https://www.javatpoint.com/ajax-tutorial'),
(5, 4, 'Kiwi', 'Cheap flight finder', 'https://www.kiwi.com/ca/cheap-flights/'),
(6, 5, 'Easy recipies', 'A great website with easy-to-make recipies', 'https://www.allrecipes.com/recipes/1947/everyday-cooking/quick-and-easy/'),
(7, 6, 'Swimming guides', 'Easy to follow swimming protocols for beginners', 'https://www.active.com/swimming/articles/get-into-shape-with-these-basics-of-swim-training'),
(8, 7, 'Personal finance', 'Great tool to learn how to manage your finance', 'https://www.investopedia.com/personal-finance-4427760'),
(9, 7, 'Investment guide', 'Lessons and articles on starting an investment portfolio', 'https://www.fool.com/investing/how-to-invest/stocks/'),
(10, 2, 'Huberman Lab Podcast', 'The best neurosience podcast ever created', 'https://hubermanlab.com/');

INSERT INTO comments (user_id, resource_id, comment, created_at) VALUES
(1, 1, 'This is a great site, I am using it almost everyday!', '2021-12-04'),
(2, 2, 'Yoga is my go-to sport now! Thanks!', '2022-01-01'),
(3, 3, 'I like the easy to understand approach of explanation in this resource', '2021-11-23'),
(4, 4, 'Very useful website! Thanks!', '2021-12-09'),
(5, 5, 'Great app for looking for the cheapest flights.', '2021-10-20'),
(6, 6, 'I wish I had more time to make all those tasty dishes!', '2022-01-05'),
(7, 7, 'I like this site!', '2021-10-12'),
(8, 8, 'A great educational website', '2021-12-21'),
(9, 9, 'Very informative! Thank you!', '2022-01-04'),
(10, 10, 'Wow! This is the best podcast!', '2021-11-11');

INSERT INTO likes (user_id, resource_id, like_amount) VALUES
(1, 1, 3),
(2, 2, 1),
(3, 3, 5),
(4, 4, 1),
(5, 5, 4),
(6, 6, 3),
(7, 7, 5),
(8, 8, 2),
(9, 9, 1),
(10, 10, 3);

INSERT INTO saves (user_id, resource_id) VALUES
(1, 1 );
-- (2, 2),
-- (3, 3),
-- (4, 4),
-- (5, 5),
-- (6, 6),
-- (7, 7),
-- (8, 8),
-- (9, 9),
-- (10, 10);

INSERT INTO ratings (user_id, resource_id, rating) VALUES
(1, 1, 5),
(2, 2, 4),
(3, 3, 5),
(4, 4, 2),
(5, 5, 5),
(6, 6, 5),
(7, 7, 5),
(8, 8, 4),
(9, 9, 2),
(10, 10, 4);
