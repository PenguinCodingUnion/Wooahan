FROM openjdk:11-ea-11-jdk-slim
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app.jar"]
LABEL authors="smini"
