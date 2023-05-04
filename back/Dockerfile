FROM adoptopenjdk/openjdk11
VOLUME /tmp
ARG JAR_FILE=back-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
#EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app.jar"]
LABEL authors="smini"
