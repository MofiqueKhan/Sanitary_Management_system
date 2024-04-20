const {
  addItemService,
  getAllItemsService,
  editItemService,
  deleteItemService,
  singleItemService,
} = require('../services/itemsServices');

const addItemController = (req, res) => {
  addItemService(req, res);
};

const getAllItemsController = (req, res) => {
  getAllItemsService(req.query.pageNumber, res);
};

const editItemController = (req, res) => {
  req.uuid = req.params.uuid;
  editItemService(req, res);
};

const deleteItemController = (req, res) => {
  deleteItemService(req.params.uuid, res);
};

const singleItemController = (req, res) => {
  singleItemService(req.params.uuid, res);
};

module.exports = {
  addItemController,
  getAllItemsController,
  editItemController,
  deleteItemController,
  singleItemController,
};
