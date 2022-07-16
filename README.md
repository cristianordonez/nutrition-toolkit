# Skeleton Template App

Repository template with custom Webpack, prettier, Jest, Cypress, and Babel configuration files.
View Miro: https://miro.com/app/board/uXjVOtvKH2s=/?share_link_id=990354105433

## Features & Usage

## Demo

## Tech Stack

This project was built with the following technologies:

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />

## Setup/ Installation

use command source server/database/schema.sql

-  Clone this repository and navigate to project directory in the terminal
-  Install necessary dependencies:

```bash
npm install
```

-  Create a client/dist directory and a index.html file for webpack to output content to.

-  Then, if environment is set to development, run the application like so:

```bash
npm run dev
```

This opens a development server in your local browser at port 3000.
If seeing errors try killing all nodemon servers:

```bash
pkill -f nodemon
```

-  When application is ready for production, have webpack build your bundle and minimize your files:

```bash
npm start
```

Then navigate to port 8080 in your browser to view your application.

## Testing

-  Run unit tests with Jest/React Testing Library:

```bash
npm test
```

-Then run end to end tests with Cypress:

```bash
npm run cypress
```

## Resources

-  [React code-splitting](https://reactjs.org/docs/code-splitting.html)
-  [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
   https://spoonacular.com/food-api/docs
   https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest

https://stackoverflow.com/questions/42749033/fatal-password-authentication-failed-for-user-root-postgresql

https://stackoverflow.com/questions/3949876/how-to-switch-databases-in-psql

https://stackoverflow.com/questions/65877048/pgadmin-on-ubuntu-20-04-fatal-password-authentication-failed-for-user
