-- WelZoneApp MySQL seed data
-- Run AFTER schema.sql on the same database.

USE `welzoneapp`;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `course_enrollments`;
DELETE FROM `user_mood`;
DELETE FROM `session_logs`;
DELETE FROM `daily_mood_log`;
DELETE FROM `course_log`;
DELETE FROM `feedback_log`;
DELETE FROM `comments`;
DELETE FROM `feedback`;
DELETE FROM `chat_messages`;
DELETE FROM `blog_readings`;
DELETE FROM `blog_posts`;
DELETE FROM `qualifications`;
DELETE FROM `slots`;
DELETE FROM `audit_logs`;
DELETE FROM `courses`;
DELETE FROM `moods`;
DELETE FROM `counselors`;
DELETE FROM `users`;

ALTER TABLE `users` AUTO_INCREMENT = 1;
ALTER TABLE `counselors` AUTO_INCREMENT = 1;
ALTER TABLE `courses` AUTO_INCREMENT = 1;
ALTER TABLE `moods` AUTO_INCREMENT = 1;
ALTER TABLE `audit_logs` AUTO_INCREMENT = 1;
ALTER TABLE `blog_posts` AUTO_INCREMENT = 1;
ALTER TABLE `chat_messages` AUTO_INCREMENT = 1;
ALTER TABLE `feedback` AUTO_INCREMENT = 1;
ALTER TABLE `comments` AUTO_INCREMENT = 1;
ALTER TABLE `qualifications` AUTO_INCREMENT = 1;
ALTER TABLE `session_logs` AUTO_INCREMENT = 1;
ALTER TABLE `slots` AUTO_INCREMENT = 1;
ALTER TABLE `user_mood` AUTO_INCREMENT = 1;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_number`, `date_of_birth`, `gender`, `created_at`, `updated_at`) VALUES
(1, 'alice', 'password123', 'alice@example.com', '555-1001', '1995-05-10 00:00:00', 'Female', NOW(), NOW()),
(2, 'bob', 'password123', 'bob@example.com', '555-1002', '1992-08-22 00:00:00', 'Male', NOW(), NOW()),
(3, 'carol', 'password123', 'carol@example.com', '555-1003', '1998-11-15 00:00:00', 'Female', NOW(), NOW());

INSERT INTO `counselors` (`counselor_id`, `username`, `password`, `email`, `phone`, `date_of_birth`, `specialization`, `qualification`, `experience`, `rating`, `created_at`, `updated_at`) VALUES
(1, 'dr_maya', 'password123', 'maya@example.com', '555-2001', '1988-03-14 00:00:00', 'Mental Health', 'MSc Psychology', 8, 4.90, NOW(), NOW()),
(2, 'dr_rahul', 'password123', 'rahul@example.com', '555-2002', '1985-09-09 00:00:00', 'Life Coaching', 'PhD Counseling', 12, 4.80, NOW(), NOW());

INSERT INTO `moods` (`id`, `mood_type`) VALUES
(1, 'Happy'),
(2, 'Sad'),
(3, 'Anxious'),
(4, 'Calm'),
(5, 'Stressed');

INSERT INTO `courses` (`courseId`, `title`, `description`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'Stress Management Basics', 'Practical tools for handling stress and pressure.', 19.99, NOW(), NOW()),
(2, 'Mindfulness for Beginners', 'A simple introduction to mindfulness and daily practice.', 24.99, NOW(), NOW()),
(3, 'Healthy Habits and Sleep', 'Build routines that support better sleep and wellbeing.', 29.99, NOW(), NOW());

INSERT INTO `qualifications` (`qualificationId`, `counselorId`, `qualification`) VALUES
(1, 1, 'MSc Psychology'),
(2, 1, 'Certified CBT Practitioner'),
(3, 2, 'PhD Counseling'),
(4, 2, 'Certified Life Coach');

INSERT INTO `slots` (`id`, `counselor_id`, `user_id`, `start_time`, `end_time`, `booked`) VALUES
(1, 1, 1, '2026-08-02 10:00:00', '2026-08-02 10:30:00', 1),
(2, 1, NULL, '2026-08-02 11:00:00', '2026-08-02 11:30:00', 0),
(3, 2, 2, '2026-08-03 14:00:00', '2026-08-03 14:30:00', 1);

INSERT INTO `audit_logs` (`auditId`, `userId`, `counselorId`, `action`, `timestamp`, `details`) VALUES
(1, 1, 1, 'USER_CREATED', NOW(), 'Seeded initial user record'),
(2, 2, 2, 'COUNSELOR_CREATED', NOW(), 'Seeded initial counselor record'),
(3, 1, 1, 'SLOT_BOOKED', NOW(), 'Seeded booked counseling slot');

INSERT INTO `blog_posts` (`id`, `counselor_id`, `title`, `content`, `created_at`) VALUES
(1, 1, 'Finding Balance in a Busy Week', 'A short guide to restoring balance when work gets overwhelming.', NOW()),
(2, 2, 'Why Small Habits Matter', 'How small daily habits can improve long-term wellbeing.', NOW());

INSERT INTO `blog_readings` (`blogId`, `userId`, `time`) VALUES
(1, 1, 180000),
(2, 2, 120000),
(1, 3, 240000);

INSERT INTO `chat_messages` (`id`, `session_id`, `sender_id`, `sender_type`, `message`, `timestamp`) VALUES
(1, 1, 1, 'USER', 'I have been feeling overwhelmed lately.', NOW()),
(2, 1, 1, 'COUNSELOR', 'Let us talk through what is triggering that feeling.', NOW());

INSERT INTO `feedback` (`feedbackId`, `sessionId`, `rating`, `comments`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5, 'Very helpful session.', NOW(), NOW()),
(2, 3, 4, 'Good advice and clear next steps.', NOW(), NOW());

INSERT INTO `comments` (`commentId`, `feedbackId`, `comment`) VALUES
(1, 1, 'Thank you for the supportive conversation.'),
(2, 2, 'I will follow the suggested routine.');

INSERT INTO `feedback_log` (`auditId`, `feedbackId`) VALUES
(1, 1),
(3, 2);

INSERT INTO `course_log` (`auditId`, `courseId`) VALUES
(1, 1),
(2, 2);

INSERT INTO `daily_mood_log` (`mood_id`, `auditId`) VALUES
(1, 1),
(3, 3);

INSERT INTO `session_logs` (`logId`, `sessionId`, `log_time`, `log_details`) VALUES
(1, 1, NOW(), 'Session started and participant joined.'),
(2, 1, NOW(), 'Action plan agreed for the next week.');

INSERT INTO `user_mood` (`id`, `user_id`, `mood_id`, `mood_set_at`) VALUES
(1, 1, 3, NOW()),
(2, 2, 4, NOW()),
(3, 3, 1, NOW());

INSERT INTO `course_enrollments` (`userId`, `courseId`, `enrollmentDate`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, NOW(), 'active', NOW(), NOW()),
(2, 2, NOW(), 'active', NOW(), NOW()),
(3, 3, NOW(), 'completed', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
