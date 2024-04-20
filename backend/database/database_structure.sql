DROP DATABASE IF EXISTS SANITARY;
CREATE DATABASE SANITARY;
USE SANITARY;

DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `Category_id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Category_id`),
  UNIQUE (`Name`)
);

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  UNIQUE (`class_type`)
);

DROP TABLE IF EXISTS `Product_details`;
CREATE TABLE `Product_details` (
  `Product_id` int NOT NULL AUTO_INCREMENT,
  `Product_uuid` varchar(255) NOT NULL DEFAULT (UUID()),
  `Category_id` int NOT NULL,
  `Class_id` int DEFAULT NULL,
  `Product_metadata` TEXT DEFAULT NULL,
  `Product_name` varchar(255) DEFAULT NULL,
  `Product_code` varchar(255) NOT NULL,
  `Product_size` varchar(255) DEFAULT NULL,
  `Product_qty` int DEFAULT NULL,
  `Product_rate` int DEFAULT NULL,
  `Product_company_name` varchar(255) DEFAULT NULL,
  `Deleted` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`Product_id`),
  UNIQUE (`Product_name`,`Product_company_name`)
);

DROP TABLE IF EXISTS `Image`;
CREATE TABLE `Image` (
  `Image_id` int NOT NULL AUTO_INCREMENT,
  `Image_file` TEXT DEFAULT NULL,
  `Product_uuid` varchar(255) NOT NULL,
  PRIMARY KEY (`Image_id`)
);