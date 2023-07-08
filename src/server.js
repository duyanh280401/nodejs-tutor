import express from "express";
import configViewEngine from "./config/viewEngine";

require('dotenv').config();
const app = express()
const port = process.env.PORT || 8086;

configViewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/baby', (req, res) => {
  res.send('Hello my baby!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})