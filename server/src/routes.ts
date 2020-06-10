import express from 'express';
import Pointscontroller from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from '../src/config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);  
const pointsController = new Pointscontroller();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);  

routes.post('/points', 
upload.single('image'), 
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required()
  })
}),
pointsController.create,
);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

export default routes;