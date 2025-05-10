FROM openjdk:21-slim

WORKDIR /app
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd
COPY .mvn .mvn
COPY pom.xml pom.xml
COPY src src

RUN ./mvnw clean package -DskipTests && \
    cp target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]