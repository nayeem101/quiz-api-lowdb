# Expressjs lowdb rest api for quiz app

## This application uses lowdb as database which stores data in db.json file.

## es6 module system (import, export) is used instead of commonjs require;

## How to run:

```bash
node app.js
```

The serever will start on http://localhost:4000. <br/>
This project can be hosted on vercel.

## Live demo: api

visit: [https://vercel.com/]

## Live demo: dashboard

visit: [https://netlify.app/]

# API routes

| instruction     | methods | endpoint    |
| --------------- | ------- | ----------- |
| get all quiz    | GET     | /quizes     |
| get single quiz | GET     | /quizes/:id |
| post a quiz     | POST    | /quizes     |
| update a quiz   | PUT     | /quizes/:id |
| delete a quiz   | DELETE  | /quizes/:id |

> made by [Nayeem](https://github.com/nayeem101/) with ❤️
