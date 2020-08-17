# Steps to get this POS to run (OMG i can't believe this is state of the art backend development)

-- Download docker
-- Run this command to setup a local postgresql db
`docker run --name ddocs -d -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres`

## WTF?
- docker run
  - Create a container with the specified image
- --name
  - name of the container to be created
- -d
  - ?????
- -p
  - Publish port, ie. Map port [5432] in the container : to port [5432] in the local machine
- e ???
- postgres
  - name of the image to base of

-- Create database following (this tutorial)[https://medium.com/better-programming/connect-from-local-machine-to-postgresql-docker-container-f785f00461a7]
-- Connect to the database (i used dbeaver) with localhost:5432


