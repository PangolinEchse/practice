-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema twitterproxy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema twitterproxy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `twitterproxy` DEFAULT CHARACTER SET utf8 ;
USE `twitterproxy` ;

-- -----------------------------------------------------
-- Table `twitterproxy`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `twitterproxy`.`user`;
CREATE TABLE  `twitterproxy`.`user` (
  `user_id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `twitterproxy`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `twitterproxy`.`post`;
CREATE TABLE  `twitterproxy`.`post` (
  `post_id` INT(10) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `likes` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `user_id` INT(10) NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE INDEX `post_id_UNIQUE` (`post_id` ASC) VISIBLE,
  INDEX `fk_post_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterproxy`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `twitterproxy`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `twitterproxy`.`tag`;
CREATE TABLE  `twitterproxy`.`tag` (
  `tag_id` INT(10) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `post_post_id` INT(10) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `tag_id_UNIQUE` (`tag_id` ASC) VISIBLE,
  INDEX `fk_tag_post1_idx` (`post_post_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_post1`
    FOREIGN KEY (`post_post_id`)
    REFERENCES `twitterproxy`.`post` (`post_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

START TRANSACTION;
INSERT INTO twitterproxy.user (user_id, name) VALUES (11, 'user1');
INSERT INTO twitterproxy.user (user_id, name) VALUES (12, 'user2');
INSERT INTO twitterproxy.user (user_id, name) VALUES (13, 'user3');
INSERT INTO twitterproxy.user (user_id, name) VALUES (14, 'user4');
INSERT INTO twitterproxy.user (user_id, name) VALUES (15, 'user5');
INSERT INTO twitterproxy.user (user_id, name) VALUES (16, 'user6');
INSERT INTO twitterproxy.user (user_id, name) VALUES (17, 'user7');
INSERT INTO twitterproxy.user (user_id, name) VALUES (18, 'user8');
INSERT INTO twitterproxy.user (user_id, name) VALUES (19, 'user9');
INSERT INTO twitterproxy.user (user_id, name) VALUES (20, 'user10');
COMMIT;

START TRANSACTION;
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at,user_id) VALUES (1, 'description1',1, '2020-05-08 10:00:00', 11);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (2,'hello description2',2,'2020-05-18 11:00:00',11);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (3,'description3',3,'2020-05-17 12:00:00',11);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (4,'description4',4,'2020-05-17 03:00:00',11);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (5,'description5',5,'2020-05-17 04:00:00',15);
INSERT INTO twitterproxy.post (post_id,description, likes, created_at, user_id) VALUES (6,'description6',6,'2020-05-17 05:00:00',15);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (7,'description7',7,'2020-05-18 06:00:00',17);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (8,'description8',8,'2020-05-18 07:00:00',18);
INSERT INTO twitterproxy.post (post_id,description, likes,  created_at, user_id) VALUES (9,'description9',9,'2020-03-01 08:00:00',19);
INSERT INTO twitterproxy.post (post_id,description, likes, created_at, user_id) VALUES (10,'description10',10,current_date(),20);
INSERT INTO twitterproxy.post (post_id,description, likes, created_at, user_id) VALUES (11,'description11',10,current_date(),20);
INSERT INTO twitterproxy.post (post_id,description, likes, created_at, user_id) VALUES (12,'description12',144,current_date(),20);
INSERT INTO twitterproxy.post (post_id,description, likes, created_at, user_id) VALUES (13,'description13',23,current_date(),20);
COMMIT;

START TRANSACTION;
INSERT INTO twitterproxy.tag (`tag_id`, name,post_post_id) VALUES (1, 'tag1',1);
INSERT INTO twitterproxy.tag (`tag_id`, name,post_post_id) VALUES (2, 'tag2',1);
INSERT INTO twitterproxy.tag (`tag_id`, name,post_post_id) VALUES (3, 'tag3',1);
COMMIT;


