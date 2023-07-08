import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";

require('dotenv').config();
const app = express()
const port = process.env.PORT || 8086;

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})