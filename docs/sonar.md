# Worx Server Application

## Unit Testing

with JUnit and Mockito

with JaCoCo

with SonarQube (Local) and SonarCloud

### SonarCloud

```console
mvn clean verify sonar:sonar \
    -Dsonar.login=<your personal access token> \
    -Dsonar.host.url=https://sonarcloud.io \
    -Dsonar.organization=<your organization key> \
    -Dsonar.projectKey=<your project key>
```

### SonarQube (Local)

```console
mvn clean verify sonar:sonar \
    -Dsonar.login=<your login> \
    -Dsonar.password=<your password> \
    -Dsonar.host.url=<your local sonarqube>
```
