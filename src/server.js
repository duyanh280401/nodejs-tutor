import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";

require('dotenv').config();
var morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
const port = process.env.PORT || 8086;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) =>{
  res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})