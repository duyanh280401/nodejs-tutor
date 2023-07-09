import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage);

    router.get('/detail/user/:id', homeController.getDetailPage);

    router.get('/baby', (req, res) => {
        res.send('Hello my baby!')
    })

    return app.use('/', router);
}

export default initWebRoute;