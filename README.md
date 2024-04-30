# HireX: Hire Talent Quick
HireX project aims to revolutionize recruitment by offering an all-in-one hiring hub. This platform
simplifies job posting, application management, and interview coordination, providing realtime collaboration through features like video interviews and chat support. Our objectives
center on optimizing the recruitment journey for recruiters, interviewers, and candidates by
enhancing speed, interaction, and decision-making through data-driven insights. Ultimately,
HireX aims to streamline the process, making it more engaging and adaptive to evolving
demands.

## Authors

* [Raj Patel](r.patel@dal.ca)
* [Rushikumar Patel](rs525735@dal.ca)
* [Nisarg Chudasama](ns458128@dal.ca)
* [Sumit Mansukhlal Savaliya](sm572004@dal.ca)
* [Vivek Alpeshbhai Sonani](viveksonani@dal.ca)
* [Roshni Joshi](rs888392@dal.ca)

## Configuration

Key variables which are used in the startup of the app. 
- `DATABASE_URI`: `MongoDB` url
- `GITHUB_PAT`: Github Personal Access Token
- `FRONTEND_URL`: URL of frontend deployment
- `HIREX_URL`: HireX url
- `JWT_SECRET`: JWT Secret Key
- `JWT_VALIDITY`: Validity of JWT Token
- `SMTP_USERNAME`: SMTP Gmail Username
- `SMTP_PASSWORD`: SMTP Gmail Password

Refer to [docker-compose.yaml](./docker-compose.yaml)

## Starting the Application

### Running All Services with latest build
To start the application containers with the latest build:

```bash
docker-compose -f docker-compose.yaml up -d --build
```

### Running All Services

To start both the backend and MySQL database services as defined in the `docker-compose.yaml` file:

```bash
docker-compose -f docker-compose.yaml up -d
```

## Additional Docker Commands

### Rebuild containers after changes
```bash
docker-compose -f docker-compose.yaml build
```
### Stopping Services
To stop all running containers:
```bash
docker-compose -f docker-compose.yaml down
```


## Built With

* [Java](https://www.java.com/en/)
* [SpringBoot](https://spring.io/projects/spring-boot)
* [ReactJS](https://legacy.reactjs.org/docs/getting-started.html/)
* [npm](https://docs.npmjs.com//)
* [MongoDB](https://www.mongodb.com/)

