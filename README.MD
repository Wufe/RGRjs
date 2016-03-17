### React GraphQL Relay repository for test purposes

#### Install

First, install node modules with

    npm install

then, install babel and webpack globally with

    npm install -g babel-cli webpack

list installed modules to check if there are unsatisfied dipendencies

    npm list

#### Execute

Create or start mongo-db docker container with mongodb inside

    docker run --name mongo-db -p 27017:27017 -d mongo

start webpack

    webpack -wd

start nodemon

    nodemon --exec npm run babel-node -- server.js
