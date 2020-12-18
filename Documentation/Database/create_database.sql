-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema attendance_tracker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema attendance_tracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `attendance_tracker` DEFAULT CHARACTER SET utf8 ;
USE `attendance_tracker` ;

-- -----------------------------------------------------
-- Table `attendance_tracker`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendance_tracker`.`employee` (
  `EMAIL` VARCHAR(350) NOT NULL,
  `NAME` VARCHAR(200) NOT NULL,
  `PASSWORD` VARCHAR(350) NULL,
  `ORGANIZATION` VARCHAR(300) NULL,
  `JOB_FUNCTION` VARCHAR(300) NULL,
  `MANAGER` VARCHAR(200) NULL,
  `HOURLY_WAGE` INT NOT NULL,
  PRIMARY KEY (`EMAIL`),
  UNIQUE INDEX `email_UNIQUE` (`EMAIL` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `attendance_tracker`.`workday`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendance_tracker`.`workday` (
  `WORKDAY_ID` INT NOT NULL AUTO_INCREMENT,
  `START_TIME` DATETIME NOT NULL,
  `WORKED_HOURS` INT NOT NULL,
  `EMPLOYEE_EMAIL` VARCHAR(350) NULL,
  PRIMARY KEY (`WORKDAY_ID`),	`
  INDEX `EMPLOYEE_EMAIL_idx` (`EMPLOYEE_EMAIL` ASC),
  CONSTRAINT `EMPLOYEE_EMAIL`
    FOREIGN KEY (`EMPLOYEE_EMAIL`)
    REFERENCES `attendance_tracker`.`employee` (`EMAIL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
