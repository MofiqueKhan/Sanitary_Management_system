const conn = require('../database/connection');
const addItemService = async (req, res) => {
  try {
    const {
      imageBlob,
      categoryName,
      classType, 
      productMetadata,
      productName,
      productCode,
      productSize,
      productQuantity,
      productRate,
      productCompany,
    } = req.body;
    const categoryID = await insertCategory(categoryName);
    const classID = await insertClass(classType);
    const productId = await insertProduct(
      categoryID,
      classID,
      productMetadata,
      productName,
      productCode,
      productSize,
      productQuantity,
      productRate,
      productCompany
    );
    const imageID = await insertImage(imageBlob, productId);
    res.status(201).send({ message: 'product added successfully' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

async function doesRecordExist(columns, table, whereClause) {
  const columnString = columns.join(',');
  try {
    console.log(`SELECT ${columnString} FROM ${table} WHERE ${whereClause}`);
    const result = await conn.query(`
    SELECT ${columnString} FROM ${table} WHERE ${whereClause}`);
    console.log(result[0][0]);
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

async function insertCategory(categoryName) {
  try {
    const isRecordExist = await doesRecordExist(
      ['Category_id AS id', 'Name'],
      'Category',
      `Name = "${categoryName}"`
    );

    if (isRecordExist) {
      return isRecordExist.id;
    }
    const result = await conn.query('INSERT INTO Category (Name) VALUES (?)', [
      categoryName,
    ]);
    return +result[0].insertId;
  } catch (err) {
    throw new Error(err);
  }
}

async function insertClass(classType) {
  try {
    const isRecordExist = await doesRecordExist(
      ['class_id AS id', 'class_type'],
      'class',
      `class_type = "${classType}"`
    );

    if (isRecordExist) {
      return isRecordExist.id;
    }
    const result = await conn.query(
      'INSERT INTO class (class_type) VALUES (?)',
      [classType]
    );
    return +result[0].insertId;
  } catch (err) {
    throw new Error(err);
  }
}

async function insertProduct(
  categoryID,
  classID,
  productMetadata,
  productName,
  productCode,
  productSize,
  productQuantity,
  productRate,
  productCompany
) {
  try {
    const isRecordExist = await doesRecordExist(
      ['product_id AS id', 'Product_name, Product_company_name'],
      'Product_details',
      `Product_name = "${productName}" AND Product_company_name = "${productCompany}"`
    );

    if (isRecordExist) {
      throw new Error('product already exist');
    }
    console.log(productMetadata);
    const result = await conn.query(
      'INSERT INTO Product_details (Category_id,Class_id,Product_metadata,Product_name,Product_code,Product_size,Product_qty,Product_rate,Product_company_name) VALUES (?,?,?,?,?,?,?,?,?)',
      [
        categoryID,
        classID,
        productMetadata,
        productName,
        productCode,
        productSize,
        productQuantity,
        productRate,
        productCompany,
      ]
    );
    console.log(result[0]);
    const uuid = await conn.query(
      `SELECT Product_uuid FROM Product_details WHERE product_id = ${+result[0]
        .insertId}`
    );
    return uuid[0][0].Product_uuid;
  } catch (err) {
    throw new Error(err);
  }
}

async function insertImage(imageBlob, productUUID) {
  try {
    const result = await conn.query(
      'INSERT INTO Image (Image_file, Product_uuid) VALUES (?, ?)',
      [imageBlob, productUUID]
    );
    return +result[0].insertId;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const getAllItemsService = async (pageNumber, res) => {
  try {
    const result = await conn.query(
      'SELECT * FROM Product_details LEFT JOIN Image ON Image.Product_uuid = Product_details.Product_uuid WHERE Product_details.Deleted = FALSE'
    );
    res.status(200).send({ data: result[0] });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const editItemService = async (req, res) => {
  try {
    const { uuid } = req;
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteItemService = async (UUID, res) => {
  try {
    const result = await conn.query(`
    UPDATE Product_details SET Deleted = TRUE WHERE Product_uuid = "${UUID}"`);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const singleItemService = async (UUID, res) => {
  try {
    const result = await conn.query(`
    SELECT * FROM Product_details WHERE Product_uuid = "${UUID}"`);
    res.status(200).send({ data: result[0] });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  addItemService,
  getAllItemsService,
  editItemService,
  deleteItemService,
  singleItemService,
};
