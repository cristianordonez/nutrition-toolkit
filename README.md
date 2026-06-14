# The MacroTrainer

A full-stack food logging application that allows users to calculate their recommended calories and macronutrient needs based on their metrics. They can then search from a list of over 350,000 foods to find any that match their desired macronutrient ranges.

## Live Link

View live deployment here at [themacrotrainer.com](https://themacrotrainer.com) or see the demo below.

## Features & Usage

- create account with username, email, password or sign in using Google
- Enter height, weight, age, gender, fitness goals and activity level to calculate your total daily recommended calories, carbohydrates, protein, and fat
- Save your favorite food items to your own personal food log
- Search for food items with any custom nutrient ranges
- Edit your recommended nutrient ranges by using the Macronutrient Calculator again or simply entering your preferred nutrient ranges
- Dark and light modes are available for preferred viewing option. User's preferred viewing option is then saved to local storage for their next visit.

## Demo

![home](./gifs/home-page.gif)
![search](./gifs/search-page.gif)
![calculator](./gifs/macrocalculator.gif)

## Tech Stack

This project was built with the following technologies:

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />

## Installation & Development

- Clone this repository and navigate to project directory in the terminal

- Install necessary dependencies:

```bash
npm install
```

- To allow code-splitting to work when building files, must first change tsconfig.json 'module' variable to 'esnext'. Feel free to change back to 'commonjs' after building files to avoid errors with using import statements instead of require statements for modules.

- use sample.env to create .env file

### Set up postgreSQL database

- Make sure service is running:

```bash
brew services list
```

- if not, start it using homebrew:

```bash
brew services start postgresql
```

- make sure the_macro_trainer and the_macro_trainer_test databases both exist on local install

- use command line to connect to postgresql instance and check databases

```bash
psql postgres
\l # list databases
\c the_macro_trainer # connect to database
\dt # list all tables
```

- create database if needed

```bash
createdb the_macro_trainer
createdb the_macro_trainer_dev
```

- create backup if needed

```bash
pg_dump -U cristianordonez -d the_macro_trainer_dev > ~/Workspace/the_macro_trainer.sql
```

- restore from backup

```bash
psql -U cristianordonez -d the_macro_trainer_dev -f ~/Workspace/the_macro_trainer.sql
```

### Set up Google Sign in

- Make sure application is configured on [Google dev console][google-dev] by following [these steps][register-google]

### Set up email service

- Update following variables in .env:

```bash
GMAIL_OAUTH_CLIENT_ID
GMAIL_OAUTH_CLIENT_SECRET
EMAIL_USERNAME
GMAIL_REFRESH_TOKEN
```

- Create new client on google cloud console with following redirect URL:

```text
https://developers.google.com/oauthplayground
```

- Enable the Gmail API on the google cloud project

- Use google playground to generate refresh token manually by scrolling to Gmail API v1 and selecting <https://mail.google.com/> and enter the client ID and client secret to create new refresh token. Add this to the .env file as GMAIL_REFRESH_TOKEN.

### Start application

- Use tsx to start server and use weback dev server to serve frontend static files:

```bash
npm run dev
```

- All data was retrieved from CSV files provided by USDA and imported into RDS PostgreSQL database.

- Note that branded foods use the nutrient_nbr field in the nutrient table as a foreign key for nutrition, while other data types use the nutrient id

## Testing

- Make sure test database is created before running test suite

```bash
createdb the_macro_trainer_test
```

- Run unit tests with Jest/React Testing Library:

```bash
npm run jest
```

-Then run end to end tests with Cypress:

```bash
npm run cypress
```

-Or run both tests concurrently:

```bash
npm run test
```

## Deployment

- When application is ready for production, have webpack build your bundle and minimize your files and then start the Express server:

```bash
npm run build
npm start
```

- Then restart PM2 process

```bash
sudo pm2 restart themacrotrainer
```

- And also restart Nginx

```bash
sudo systemctl restart nginx
```

Then navigate to port 8080 in your browser to view your application.

## Resources

- [React code-splitting][react]
- [Intersection Observer API][insersection]
- [Set up tests with Jest and Supertest][jest]
- [Set up users for PostgreSQL][pgsql]
- [Fixing issues with setting up PostgreSQL on RDS][rds]
- [Getting correct permissions to tables for requests sent from EC2 instance][ec2]
- [Setting up custom domain when using Nginx][nginx]
- [Passport node.js][passport]
- [Google Dev Console][google-dev]

[passport]: https://www.passportjs.org/packages/passport-google-oauth20/
[react]: https://reactjs.org/docs/code-splitting.html
[insersection]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[jest]: https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest
[pgsql]: https://stackoverflow.com/questions/42749033/fatal-password-authentication-failed-for-user-root-postgresql
[rds]: https://stackoverflow.com/questions/65877048/pgadmin-on-ubuntu-20-04-fatal-password-authentication-failed-for-user
[ec2]: https://stackoverflow.com/questions/55080121/amazon-rds-postgresql-role-cannot-access-tables
[nginx]: https://stackoverflow.com/questions/32467541/link-a-google-domain-to-amazon-ec2-server#:~:text=In%20your%20google%20domain%20admin,from%20the%20amazon%20EC2%20instance.
[google-dev]: https://console.cloud.google.com/welcome?project=macrotrainer
[register-google]: https://www.passportjs.org/tutorials/google/register/
