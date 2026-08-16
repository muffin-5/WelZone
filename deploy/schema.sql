-- WelZoneApp MySQL schema
-- Fresh deployment schema, derived from the actual backend repository SQL.
-- Use on a clean MySQL 8 database (e.g. Aiven free tier).
-- Run BEFORE seed.sql.

CREATE DATABASE IF NOT EXISTS `welzoneapp`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `welzoneapp`;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `users` (
  `id`            BIGINT       NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(100) NOT NULL,
  `password`      VARCHAR(255) NOT NULL,
  `email`         VARCHAR(255) NOT NULL,
  `phone_number`  VARCHAR(30)  DEFAULT NULL,
  `date_of_birth` DATETIME     DEFAULT NULL,
  `gender`        VARCHAR(20)  DEFAULT NULL,
  `created_at`    DATETIME     NOT NULL,
  `updated_at`    DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_username` (`username`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `counselors` (
  `counselor_id`   BIGINT       NOT NULL AUTO_INCREMENT,
  `username`       VARCHAR(100) NOT NULL,
  `password`       VARCHAR(255) NOT NULL,
  `email`          VARCHAR(255) NOT NULL,
  `phone`          VARCHAR(30)  DEFAULT NULL,
  `date_of_birth`  DATETIME     DEFAULT NULL,
  `specialization` VARCHAR(255) DEFAULT NULL,
  `qualification`  VARCHAR(255) DEFAULT NULL,
  `experience`     INT          DEFAULT NULL,
  `rating`         DECIMAL(3,2) DEFAULT NULL,
  `created_at`     DATETIME     NOT NULL,
  `updated_at`     DATETIME     NOT NULL,
  PRIMARY KEY (`counselor_id`),
  UNIQUE KEY `uk_counselors_username` (`username`),
  UNIQUE KEY `uk_counselors_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `moods` (
  `id`        BIGINT       NOT NULL AUTO_INCREMENT,
  `mood_type` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `courses` (
  `courseId`    BIGINT       NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255) NOT NULL,
  `description` TEXT         DEFAULT NULL,
  `price`       DECIMAL(10,2) NOT NULL,
  `createdAt`   DATETIME     NOT NULL,
  `updatedAt`   DATETIME     NOT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `slots` (
  `id`           BIGINT      NOT NULL AUTO_INCREMENT,
  `counselor_id` BIGINT      NOT NULL,
  `user_id`      BIGINT      DEFAULT NULL,
  `start_time`   DATETIME    NOT NULL,
  `end_time`     DATETIME    NOT NULL,
  `booked`       TINYINT(1)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_slots_counselor_id` (`counselor_id`),
  KEY `idx_slots_user_id` (`user_id`),
  CONSTRAINT `fk_slots_counselor` FOREIGN KEY (`counselor_id`) REFERENCES `counselors` (`counselor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_slots_user`      FOREIGN KEY (`user_id`)      REFERENCES `users`      (`id`)          ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `qualifications` (
  `qualificationId` BIGINT       NOT NULL AUTO_INCREMENT,
  `counselorId`     BIGINT       NOT NULL,
  `qualification`   VARCHAR(255) NOT NULL,
  PRIMARY KEY (`qualificationId`),
  KEY `idx_qualifications_counselorId` (`counselorId`),
  CONSTRAINT `fk_qualifications_counselor` FOREIGN KEY (`counselorId`) REFERENCES `counselors` (`counselor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `audit_logs` (
  `auditId`     BIGINT       NOT NULL AUTO_INCREMENT,
  `userId`      BIGINT       DEFAULT NULL,
  `counselorId` BIGINT       DEFAULT NULL,
  `action`      VARCHAR(255) NOT NULL,
  `timestamp`   DATETIME     NOT NULL,
  `details`     TEXT         DEFAULT NULL,
  PRIMARY KEY (`auditId`),
  KEY `idx_audit_logs_userId` (`userId`),
  KEY `idx_audit_logs_counselorId` (`counselorId`),
  CONSTRAINT `fk_audit_logs_user`      FOREIGN KEY (`userId`)      REFERENCES `users`      (`id`)          ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_audit_logs_counselor` FOREIGN KEY (`counselorId`) REFERENCES `counselors` (`counselor_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_posts` (
  `id`           BIGINT       NOT NULL AUTO_INCREMENT,
  `counselor_id` BIGINT       NOT NULL,
  `title`        VARCHAR(255) NOT NULL,
  `content`      LONGTEXT     DEFAULT NULL,
  `created_at`   DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_blog_posts_counselor_id` (`counselor_id`),
  CONSTRAINT `fk_blog_posts_counselor` FOREIGN KEY (`counselor_id`) REFERENCES `counselors` (`counselor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_readings` (
  `blogId` BIGINT NOT NULL,
  `userId` BIGINT NOT NULL,
  `time`   BIGINT NOT NULL,
  PRIMARY KEY (`blogId`, `userId`),
  KEY `idx_blog_readings_userId` (`userId`),
  CONSTRAINT `fk_blog_readings_blog` FOREIGN KEY (`blogId`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_readings_user` FOREIGN KEY (`userId`) REFERENCES `users`      (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `chat_messages` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `session_id`  BIGINT       NOT NULL,
  `sender_id`   BIGINT       NOT NULL,
  `sender_type` VARCHAR(20)  NOT NULL,
  `message`     TEXT         NOT NULL,
  `timestamp`   DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_chat_messages_session_id` (`session_id`),
  CONSTRAINT `fk_chat_messages_session` FOREIGN KEY (`session_id`) REFERENCES `slots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `feedback` (
  `feedbackId` BIGINT   NOT NULL AUTO_INCREMENT,
  `sessionId`  BIGINT   NOT NULL,
  `rating`     INT      NOT NULL,
  `comments`   TEXT     DEFAULT NULL,
  `createdAt`  DATETIME NOT NULL,
  `updatedAt`  DATETIME NOT NULL,
  PRIMARY KEY (`feedbackId`),
  KEY `idx_feedback_sessionId` (`sessionId`),
  CONSTRAINT `fk_feedback_session` FOREIGN KEY (`sessionId`) REFERENCES `slots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comments` (
  `commentId`  BIGINT NOT NULL AUTO_INCREMENT,
  `feedbackId` BIGINT NOT NULL,
  `comment`    TEXT   NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `idx_comments_feedbackId` (`feedbackId`),
  CONSTRAINT `fk_comments_feedback` FOREIGN KEY (`feedbackId`) REFERENCES `feedback` (`feedbackId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `feedback_log` (
  `auditId`    BIGINT NOT NULL,
  `feedbackId` BIGINT NOT NULL,
  PRIMARY KEY (`auditId`, `feedbackId`),
  KEY `idx_feedback_log_feedbackId` (`feedbackId`),
  CONSTRAINT `fk_feedback_log_audit`    FOREIGN KEY (`auditId`)    REFERENCES `audit_logs` (`auditId`)    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_log_feedback` FOREIGN KEY (`feedbackId`) REFERENCES `feedback`   (`feedbackId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `course_log` (
  `auditId`  BIGINT NOT NULL,
  `courseId` BIGINT NOT NULL,
  PRIMARY KEY (`auditId`, `courseId`),
  KEY `idx_course_log_courseId` (`courseId`),
  CONSTRAINT `fk_course_log_audit`  FOREIGN KEY (`auditId`)  REFERENCES `audit_logs` (`auditId`)  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_course_log_course` FOREIGN KEY (`courseId`) REFERENCES `courses`    (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `daily_mood_log` (
  `mood_id` BIGINT NOT NULL,
  `auditId` BIGINT NOT NULL,
  PRIMARY KEY (`mood_id`, `auditId`),
  KEY `idx_daily_mood_log_auditId` (`auditId`),
  CONSTRAINT `fk_daily_mood_log_mood`  FOREIGN KEY (`mood_id`) REFERENCES `moods`      (`id`)      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_daily_mood_log_audit` FOREIGN KEY (`auditId`) REFERENCES `audit_logs` (`auditId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `session_logs` (
  `logId`       BIGINT   NOT NULL AUTO_INCREMENT,
  `sessionId`   BIGINT   NOT NULL,
  `log_time`    DATETIME NOT NULL,
  `log_details` TEXT     DEFAULT NULL,
  PRIMARY KEY (`logId`),
  KEY `idx_session_logs_sessionId` (`sessionId`),
  CONSTRAINT `fk_session_logs_session` FOREIGN KEY (`sessionId`) REFERENCES `slots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_mood` (
  `id`          BIGINT   NOT NULL AUTO_INCREMENT,
  `user_id`     BIGINT   NOT NULL,
  `mood_id`     BIGINT   NOT NULL,
  `mood_set_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_mood_user_id` (`user_id`),
  KEY `idx_user_mood_mood_id` (`mood_id`),
  CONSTRAINT `fk_user_mood_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_mood_mood` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `course_enrollments` (
  `userId`         BIGINT      NOT NULL,
  `courseId`       BIGINT      NOT NULL,
  `enrollmentDate` DATETIME    NOT NULL,
  `status`         VARCHAR(50) NOT NULL DEFAULT 'active',
  `createdAt`      DATETIME    NOT NULL,
  `updatedAt`      DATETIME    NOT NULL,
  PRIMARY KEY (`userId`, `courseId`),
  KEY `idx_course_enrollments_courseId` (`courseId`),
  CONSTRAINT `fk_course_enrollments_user`   FOREIGN KEY (`userId`)   REFERENCES `users`   (`id`)       ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_course_enrollments_course` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
