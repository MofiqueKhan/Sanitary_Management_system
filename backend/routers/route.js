const express = require('express');
const route = express.Router();
const app = express();
//====================Controllers=====================//
const itemsController = require('../controllers/itemsController');

route.get('/', (req, res) => res.send('hello'));
route.post('/add-item', itemsController.addItemController);
route.get('/get-items/:pageNumber', itemsController.getAllItemsController);
route.patch('/edit-item/:uuid', itemsController.editItemController);
route.patch('/delete-item/:uuid', itemsController.deleteItemController);
route.get('/get-single-item/:uuid', itemsController.singleItemController)
// app.patch('/users/:userId',[userController.patchById])
// app.delete('/user/:userId',[
//     userController.removeById
// ])

module.exports = route;
