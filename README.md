# CrowdAnalyzer Backend Task

## The Problem

As a user I want to have a portal where I can list/add/delete dashboards.

### Tech Used

- [node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud-hosted MongoDB service on AWS, Azure and Google Cloud. 

### System Features

Create endpoints to list/add/delete dashboards.

### Installation and startup

1. Type `npm install` in the terminal to install the dependencies from `package.json` file.
2. Run the project:
    -   backend only type `npm run start` in the terminal.
    -   backend with testing type `npm run test` in the terminal.
    -   backend with swagger docks type `npm run docs` in the terminal.
5. By default the batabase is mongodb atlas to use a local database change the database string in `config.js` or set the string to enviroment variable `MONGO_DB_URL`.
6. By default the backend and the swagger docs runs on _PORT:3000_ and _PORT:3001_ to use another port change the _PORT_ and _docsPORT_ value in `config.js` or set the value to enviroment variable `PORT` and `DOCS_PORT`.
7. By default the backend runs on PORT:3000 to use another port change the port value in `config.js` or set the value to enviroment variable `PORT`.

### API Description
- Dashboard
```
{
  title: string
  description: string
  charts: [Chart]
}
```

- Chart
```
{
  title: string
  type: enum ['pie', 'line', 'bar']
  dateRange: {
      from:date
      to:date
  }
  interval: enum ['hour', 'day', 'month']
 }
}
```

| Action                       | Endpoint URL      | Verb       | Request Body | Response               |
| ---------------------------- | ----------------- | ----       | ------------ | --------               |
| Create New Dashboard          | /dashboard        | POST      | `Dashboard`  | `Dashboard`            |
| List All Dashboards           | /dashboard        | GET       |      -       |  `Array[Dashboard]`    |
| Delete Dashboard              | /dashboard/:id    | DELETE    |-             | `Status Message`       |
| Add Chart                     | /dashboard/chart  | POST      | `Chart`      | `Status Message`       |

# API Example
- Dashboard
```
{
  title: 'Dashboard 1'
  description: 'this is the dashboard description'
}
```
| Endpoint URL      | Verb       | Request Body | Response               |
| ----------------- | ----       | ------------ | --------               |
| /dashboard        | POST      | `Dashboard`  | `Dashboard`            |

- Chart
```
{
  title: 'Chart1'
  type: 'pie'
  dateRange: {
      from: '2021-06-20'
      to: '2021-06-21'
  }
  interval: 'hour',
  dashboardId: Dashbaord._id
 }
}
```
| Endpoint URL      | Verb       | Request Body | Response               |
| ----------------- | ----       | ------------ | --------               |
| /dashboard/chart  | POST      | `Chart`  | _Chart added to Dashboard!_|
