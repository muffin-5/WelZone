# Multi-stage build: compile with Maven + JDK 25, run with JRE 25
FROM maven:3.9.16-eclipse-temurin-25-noble AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:25-jre-noble
WORKDIR /app
COPY --from=build /app/target/WelZoneApp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]