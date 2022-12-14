var express = require('express'),
   routes = express.Router();

var orderController = require('./controller/orderController');

routes.post('/add_product',orderController.add_product);
routes.get('/get_product',orderController.get_product);
routes.post('/add_order',orderController.add_order);
routes.get('/order_details/:id?',orderController.order_details);
routes.get('/get_order_list/:id?',orderController.get_order_list);

routes.put('/edit_order/:id?',orderController.edit_order);
routes.delete('/delete_order/:id?',orderController.delete_order);









module.exports = routes; 
