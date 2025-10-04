# paurus-challenge

Interview challenge for Paurus company.

# Deployment

## Prerequisites

You should have **node** (at least version 20), and **npm** installed on your machine.

## Deployment steps

Deployment of the aplication can be done in a few siple steps:
1. navigate to the `backend` directory and run following commands to install a fake json server and run it.
```
npm i json-server
npx json-server db.json
```
2. navigate to the `frontend` and run following commands to run the angular app itself. 
```
npm install
npm run start
```
3. access the web interface on [http://localhost:4200](http://localhost:4200)

Or you can simply use `docker compose up` command if you have `docker` installed. 
