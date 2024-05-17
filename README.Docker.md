# Docker Compose Guide for the 2048 Application

This guide will help you to use Docker Compose for running the application.

## Prerequisites

Ensure Docker and Docker Compose are installed on your machine.

## Application Structure

The application consists of two main services:

1. `front-end`: This is the front-end service of the application.
2. `back-end`: This is the back-end service of the application.

These services are defined in the `compose.yaml` file.

>[!IMPORTANT]
>Because the front-end application is static, the backend host (`VITE_API_HOST`) must be defined at build time. Therefore, any change to the backend host requires the front-end service to be rebuilt.

## Running the Application

To run the application, use the following command in the terminal:

```sh
docker compose up --build
```

This command will build the Docker images for the services (if not already built) and start the services.

The front-end service will be accessible at `http://localhost:80` and the back-end service will be accessible at `http://localhost:3001`.

## Environment Variables

>[!WARNING]
>You need to set at least `GROQ_API_KEY` environment variable and `VITE_API_HOST` argument in order to run the application.

The application uses several environment variables, which are defined in the `compose.yaml` file under each service's `environment` section. For example, the `back-end` service uses `NODE_ENV`, `APP_NAME`, `APP_PORT`, `APP_ROUTE_PREFIX`, and `GROQ_API_KEY`.

You can modify these environment variables in the `compose.yaml` file as needed.

## Stopping the Application

To stop the application, use the following command in the terminal:

```sh
docker compose down
```

This command will stop and remove the containers, networks, and volumes defined in the `compose.yaml` file.
