require('dotenv').config();
import path from 'path';
import express from 'express';
const port = 8080;
import bodyParser from 'body-parser';
import compression from 'compression';
import user from './routes/user.route';
import recipes from './routes/recipe.route';
import menuItems from './routes/menuitems.route';
import groceryProducts from './routes/groceryproducts.route';

const app = express();
//MIDDLEWARE
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//ROUTES
app.use('/user', user);
app.use('/recipes', recipes);
app.use('/menuItems', menuItems);
app.use('/groceryProducts', groceryProducts);

app.get('/', (req: express.Request, res: express.Response) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'Diabetes Meal Plan',
         version: '1.0.0',
      },
   });
});

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
