FROM amazoncorretto:17

LABEL version="1.0", author="Pramukh Prakash"

EXPOSE 8080:8080

WORKDIR /app

COPY target/product-service.jar /app/product-service.jar

ENTRYPOINT ["java", "-jar", "product-service.jar"]

