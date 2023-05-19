-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8b206.p.ssafy.io    Database: wooahan
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reward`
--

DROP TABLE IF EXISTS `reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward` (
  `reward_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `word_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reward_id`),
  KEY `FKf4dbr6np2yfxggg7st6girb66` (`member_id`),
  KEY `FK2es620spdjn9muheve4r01rr1` (`word_id`),
  CONSTRAINT `FK2es620spdjn9muheve4r01rr1` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_name`),
  CONSTRAINT `FKf4dbr6np2yfxggg7st6girb66` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward`
--

LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;
INSERT INTO `reward` VALUES (2,55,'호텔'),(3,53,'텔레비전'),(4,53,'고양이'),(5,56,'소풍'),(6,53,'선물'),(7,55,'비디오');
/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  9:43:05
