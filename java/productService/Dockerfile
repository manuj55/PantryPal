FROM openjdk:11

LABEL version="1.0", author="Pramukh Prakash"

EXPOSE 5004

WORKDIR /app

COPY target/product-service.jar /app/product-service.jar

ENTRYPOINT ["java", "-jar", "product-service.jar"]