FROM openjdk:17

LABEL version="1.0", author="Pramukh Prakash"

EXPOSE 5005

WORKDIR /app

COPY target/payment-service.jar /app/payment-service.jar

ENTRYPOINT ["java", "-jar", "product-service.jar"]