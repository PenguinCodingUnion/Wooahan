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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `is_guest` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `star_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (41,'73604c00-4d9e-4cda-bda5-c781572714c1',_binary '','guest','557ede09c186ab32',0),(42,'273a6c11-b7da-4862-9aa0-b167481d68ce',_binary '','guest','5f2b286304dd51bf',0),(43,'73f6ab10-c76c-43c2-967c-71c182be34ae',_binary '','guest','a4353f8efef00ff0',0),(45,'035e4e78-ccaf-42a4-a289-887c1f361c3f',_binary '','guest','6f805652e4afd86a',0),(46,'b7f741b3-6d27-49a3-8524-6b5ce84a922d',_binary '','guest','5e213e145aab3965',0),(47,'3acf5b8d-93a5-4d74-8a85-2a726df794d9',_binary '','guest','c5776279ec486607',1),(50,'b4edc1b6-1f37-4a92-a531-0a7d35328617',_binary '','guest','500cd4e5a8fb9c95',0),(51,'rhkd0363@gmail.com',_binary '\0','신현광([대전_1반_B104]팀원)','c709fc0254e47bb7',0),(52,'1169813064',_binary '\0','chs','android_test_id_man',0),(53,'7e006c40-8963-47c9-aa61-2bffffd5e5f7',_binary '','guest','android_test_id_man',1),(54,'5acc9ec7-ade9-41a9-8730-38bd71454caa',_binary '','guest','9f47892113c7ee89',1),(55,'2796120409',_binary '\0','이지우','bf18b4df2a5d6f30',0),(56,'37ebfd53-f067-47ea-affb-5739ac2bb122',_binary '','guest','bf18b4df2a5d6f30',0),(57,'777dad53-86d8-40b3-b5ca-5963d9e0a500',_binary '','guest','9922217fd8e4c2ed',0),(58,'3320ec62-e074-47bd-87c0-76568164eb06',_binary '','guest','c709fc0254e47bb7',0),(59,'a3e4efc3-d3c6-46dc-b667-68fe6b0258d6',_binary '','guest','3a8858d736d774d8',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  9:43:06
