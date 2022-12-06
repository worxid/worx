FROM openjdk:11-jre-slim
LABEL author="worx.id"

# Dependencies
RUN apt-get update; apt-get install -y fontconfig libfreetype6

# The application's jar file
ARG JAR_FILE=target/worx.jar

# Add the application's jar to the container
ADD ${JAR_FILE} worx.jar

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/worx.jar"]