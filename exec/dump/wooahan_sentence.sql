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
-- Table structure for table `sentence`
--

DROP TABLE IF EXISTS `sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence` (
  `sentence_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `difficulty` int DEFAULT NULL,
  `spacing_cnt` int NOT NULL,
  PRIMARY KEY (`sentence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence`
--

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;
INSERT INTO `sentence` VALUES (1,'엄마랑 공원에 놀러 가요',1,4),(2,'우리 집 강아지는 복슬강아지',2,4),(3,'아버지께서 선물을 사주셨어요',1,3),(4,'선생님께 인사해요',0,2),(5,'친구들과 신나게 뛰어요',1,3),(6,'참새가 노래를 부르며 날아가요',1,4),(7,'마트에서 생선을 샀어요',0,3),(8,'아빠의 자동차를 타고 가요',1,4),(9,'채소를 볶아 먹어요',0,3),(10,'청소는 항상 즐거워요',0,3),(11,'학교에 지각하면 안 돼요',2,4),(12,'숙제를 꼼꼼히 제출해요',1,3),(13,'저는 멋진 요리사가 될 거예요',2,5),(14,'남극에는 펭귄이 살아요',1,3),(15,'병아리가 삐약삐약 울어요',1,3),(16,'강아지가 눈밭을 달려요',0,3),(17,'사자가 사슴과 놀아요',1,3),(18,'다람쥐가 도토리를 모아요',1,3),(19,'기린이 높은 나무에 기대요',2,4),(20,'반짝반짝 작은 별이 있어요',1,4),(21,'비행기가 하늘을 날아요',0,3),(22,'기차가 칙칙폭폭 달려요',0,3),(23,'세상에서 제일가는 멋쟁이',2,3),(24,'아기가 엉금엉금 기어요',0,3),(25,'오늘도 친구랑 재밌게 놀았다',2,4),(26,'이 주먹밥 너무 맛있다',2,4),(27,'아침에 일찍 일어나요',1,3),(28,'내일은 내일의 해가 뜬다',2,4),(29,'색종이를 반으로 접어요',1,3),(30,'즐거운 한글 공부',0,3),(31,'다람쥐가 도토리를 먹어요',1,3),(32,'무럭무럭 자라나는 나무들',1,3),(33,'타조가 열심히 달려요',1,3),(34,'알록달록 맛있는 솜사탕',1,3),(35,'마음에 꽃이 피었습니다',0,3),(36,'무궁화 꽃이 피었습니다',0,3),(37,'깨끗하게 이를 닦아요',1,3),(38,'아빠가 출근을 해요',0,3),(39,'엄마가 설거지를 해요',0,3),(40,'행복한 꿈을 꾸었어요',1,3),(41,'하늘에서 별을 따요',0,3),(42,'꽃이 활짝 피었습니다',1,3),(43,'새싹이 돋았습니다',0,2),(44,'화창한 날씨가 좋아요',1,3),(45,'엄마 아빠 사랑해요',0,3),(46,'소가 음메하고 운다',1,3),(47,'강아지가 왈왈 짖는다',2,3),(48,'엄마와 아빠가 웃어요',0,3),(49,'얘들아 나랑 같이 놀자',2,4),(50,'꽃이 활짝 핀다',0,3),(51,'다시 확인해 볼까요?',2,3),(52,'커피 향이 정말 좋아요!',2,4),(53,'올바르게 마스크를 착용해요',1,3),(54,'지금 무슨 노래 들어요?',2,4),(55,'즐거운 여행을 시작해요',0,3),(56,'날개를 펼쳐 날아보아요 ',2,3),(57,'거품이 보글보글 끓어요',0,3),(58,'달아 달아 밝은 달아',2,4),(59,'엄마 손잡고 나들이 간다',2,4),(60,'무한한 우주 저 너머로!',2,4),(61,'매일매일 물을 마셔요',2,3),(62,'문에 기대면 위험해요',0,3),(63,'엄마가 요리를 해요',0,3),(64,'아빠가 낚시를 해요',0,3),(65,'생일 축하해요',0,2),(66,'해바라기가 해를 봐요',0,3),(67,'서울로 이사를 가요',0,3),(68,'스키를 타러 가요',0,3),(69,'베개가 푹신푹신해요',0,2),(70,'해외여행을 갑니다',0,2),(71,'비눗방울을 불어요',0,2),(72,'우리 집은 아파트에요',0,3),(73,'주말에 목욕탕에 갈거예요',2,3),(74,'저는 초록색을 좋아해요',0,3),(75,'바닷가에서 모래성을 만들어요',1,3),(76,'절벽은 무서워요',0,2),(77,'운동을 하면 땀이 나요',2,4),(78,'비행기를 타고 싶어요',2,3),(79,'차를 타면 멀미가 나요',1,4),(80,'소풍을 가서 보물찾기를 해요',2,4),(81,'설날에 세배를 해요',0,3),(82,'손을 들고 횡단보도를 건너요',1,4),(83,'아침마다 영어공부를 해요',0,3),(84,'호랑이는 떡을 좋아했습니다',1,3),(85,'할아버지가 고개를 넘고 있었습니다',2,4),(86,'호랑이 울음소리가 들려요',1,3),(87,'옛날에 나무꾼 부부가 살았습니다',2,4),(88,'커다란 황금을 발견했습니다',1,3),(89,'송아지가 한 마리 있습니다',2,4),(90,'나는 이제 부자가 되겠구나!',2,4),(91,'내 꾀에 내가 넘어갔구나!',2,4),(92,'눈살 찌푸려질 때가 있죠',2,4),(93,'할머니 집으로 돌아갑니다',1,3),(94,'상대방의 입장이 되어 보자',2,4),(95,'하늘에 떠 있던 반달',2,4),(96,'산 위로 올라갔습니다',2,3);
/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  9:43:07
