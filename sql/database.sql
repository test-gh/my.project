-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS express
DEFAULT CHARACTER SET utf8




-- USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `user_id`     int(32)      unsigned                NOT NULL auto_increment,
  `username`    varchar(32)  collate utf8_general_ci NOT NULL,
  `password`    varchar(144) collate utf8_general_ci NOT NULL,
  `firstname`   varchar(64)  collate utf8_general_ci NOT NULL,
  `lastname`    varchar(64)  collate utf8_general_ci NOT NULL,
  `email`       varchar(64)  collate utf8_general_ci NOT NULL,
  `website`     varchar(64)  collate utf8_general_ci     NULL default NULL,
  `address`     varchar(64)  collate utf8_general_ci     NULL default NULL,
  `phone`       varchar(32)  collate utf8_general_ci     NULL default NULL,
  `language`    varchar(16)  collate utf8_general_ci NOT NULL default 'ENGLISH',
  `status`      tinyint(1)                           NOT NULL default 0,
  `admin`       boolean                              NOT NULL default 0,
  `date_join`   timestamp                            NOT NULL default CURRENT_TIMESTAMP,
  `date_unjoin` timestamp                                NULL default NULL,
  `coi_ip`      varchar(16)  collate utf8_general_ci     NULL default NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Users Table';





INSERT INTO users (username, password, firstname, lastname, email) VALUES ('admin', '$2a$10$TvEHykZFDXzof8l1ojQ6mOYjIlSzjkp5lfojG77meUYv0q1SDB8YK', 'Master', 'Root', 'face.off@free.fr');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('coincoin', '$2a$10$m8DP3sJXEcRsU0kvJAZsTeWaRWB25C82fx0f1ImuNBjfFRAzcxFBe', 'Can', 'Hard', 'supercoincoin@blackhole.io');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('foo/bar', '$2a$10$mgN4DQL8KtxT9V6N5725TOGQsdGa5NBiD934kdduZykhS5ens/CJ2', 'Foo', 'Bar', 'foobar@blackhole.io');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('jdoe', '$2a$10$fCBLheBdFcHapf5yw8AKa.in1aOk.uKJs7a6RVfQSm02BXpCQYpS.', 'John', 'Doe', 'foobar@blackhole.io');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('miam', '$2a$10$I9iWWYdYmVUosCEkdu0mp.Keg4POT5p7swrb5PHtY61CVB6qNLF96', 'Joël', 'Robuchon', 'jrobuchon@blackhole.io');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('émêïrù', '$2a$10$s4RJAf3VlrtlPZkc.ilw.uPYtDr3zp7gqqSdUkm35mKCLMJNaGkDu', 'Ëmaï', 'Yôblùràsté', 'accent@blackhole.io');
INSERT INTO users (username, password, firstname, lastname, email) VALUES ('jc dlh', '$2a$10$Mn6z6x2FCCe24QE0GIVux.ksoxdfOv1Li2JOwhpvpkce2m0Bgt5IW', 'Jean Claude', 'De la Haute', 'jc.dlh@blackhole.io');

UPDATE users SET admin=1 WHERE username = 'admin';




-- STATUS TABLE
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` int(32)     unsigned                NOT NULL,
  `status`    varchar(16) collate utf8_general_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Status Table';

-- STATUS INIT
INSERT INTO `status` (`status_id`, `status`) VALUES
(0, 'CREATED'),
(1, 'ACTIVATED'),
(2, 'SUSPENDED'),
(3, 'CLOSED');




-- LEVEL TABLE
CREATE TABLE IF NOT EXISTS `level` (
  `level_id` int(32)     unsigned                NOT NULL,
  `level`    varchar(16) collate utf8_general_ci NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Level Table';

-- LEVEL INIT
INSERT INTO `level` (`level_id`, `level`) VALUES
(0, 'ADMIN'),
(1, 'STANDARD');
