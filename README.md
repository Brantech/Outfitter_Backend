# Outfitter Backend

## About

This repository shall contain all of the backend services associated with this project. 

## Testing

Execute the following at the root of the project directory: 
```
❯ docker-compose up | grep 'test'
```

You should see output similar to the following:
```
Starting mongo ... done
Starting test  ... done
Attaching to mongo, test
test     | wait-for-it.sh: waiting 15 seconds for mongo:27017
test     | wait-for-it.sh: mongo:27017 is available after 10 seconds
test     |
test     | > http-server@1.0.0 start /usr/src/test
test     | > node server.js
test     |
test     | Database created!
test exited with code 0
```

Press ctrl+c to exit.

## Directory Structure

In order to ensure proper organization, each service shall have its own directory within the root directory.

For clarity, here is the expected directory structure (simplified):
```
.
├── ...
├── scripts
│   └── ...
├── service-a
│   ├── Dockerfile
│   └── ...
└── service-b
    ├── Dockerfile
    └── ...
```

As you can see, each service has its own directory and corresponding Dockerfile; ensure that all new services meet this requirement.

## Docker

Docker will simplify the management and deployment of our backend services. With Docker, we can easily establish connections between each of our services, and spin them up with a very simple set of commands. Docker is built on the concept of **images** and **containers**. Think of an image as a snapshot of a configured application and environment, and a container as the snapshot dethawed.

### Dockerfiles

Dockerfiles define the specifics of how an image should be built. In the context of our project, each service will need such a definition file.

### Compose

Compose is a tool for defining and running multi-container Docker applications. The `docker-compose.yml` at the root of the project directory tells compose how to build and link the services in our application.

## Docker Scripts

Any scripts useful for the container spin-up process should be placed in the `./docker-scripts` directory. The scripts contained within this directory are shareable by all services! The process necessary for importing these scripts will be described in a later section.

## Database Data

Database data shall not be included in git. Currently, the `.gitignore` at the root of the project directory includes a rule to ignore the `data-db` directory. This ignored directory will be mapped to a data volume used by services that require access to our primary data store. 