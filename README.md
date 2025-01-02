# Ecommerce AWS Springboot React MySQL

A full-stack e-commerce application built with Spring Boot backend, React frontend, and MySQL database, deployed on AWS.

## Tech Stack

- Backend: Spring Boot 3.4.1
- Database: MySQL 8.2
- Security: JWT Authentication
- Cloud: AWS S3 for storage
- Frontend: React

## Features

- JWT-based authentication
- User management
- Product catalog
- Order processing
- AWS S3 integration for file storage
- RESTful API
- Environment-based configuration

## Prerequisites

- JDK 21
- Maven 3.9+
- MySQL 8+
- Node.js (for React frontend)
- AWS Account with S3 access

## Configuration

1. Database configuration in [application.properties](backend/src/main/resources/application.properties):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/${MYSQL_DATABASE}
spring.datasource.username=${MYSQL_USERNAME}
spring.datasource.password=${MYSQL_PASSWORD}
```

2. Create .env file in backend/src/main/resources with:
```properties
MYSQL_USERNAME=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=ecommerce-aws
SECRETJWT=your_jwt_secret
ACCESS_KEY_AWS=your_aws_access_key
SECRET_ACCESS_KEY_AWS=your_aws_secret_key
```

## Running Locally
1. Backend:
```bash
cd backend
mvn spring-boot:run
```

2.Frontend:
```bash
cd frontend
npm install
npm start
```

## Building
```bash
mvn clean install
```


## Contact

- **Your Name:** [princekiptoo@gmail.com](mailto:princekiptoo@gmail.com)
- **GitHub:** [https://github.com/tobitprince](https://github.com/tobitprince)
- **LinkedIn:** [Your LinkedIn Profile](https://www.linkedin.com/in/)

---

