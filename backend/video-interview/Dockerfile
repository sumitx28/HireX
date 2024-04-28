# @author Raj Patel

FROM maven:3.9.6-amazoncorretto-17-al2023 AS builder
WORKDIR /app
COPY pom.xml ./
COPY src src/
RUN mvn clean package

FROM amazoncorretto:17
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8082
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]