const hostAddress = "http://localhost:8081";
async function veiwAllProducts() {
  const productTable = document.getElementById("product-table");
  const resultQuery = await fetch(`${hostAddress}/get-items/1`);
  const result = await resultQuery.json();

  const tableHeadings = document.createElement("tr");
  const excludeColumns = [
    "Product_id",
    "Product_uuid",
    "Product_metadata",
    "Deleted",
    "Category_id",
    "Class_id",
    "Image_id",
    "Image_file",
  ];
  console.log(result.data);
  tableHeadings.innerHTML += "<th>ID</th>";
  Object.keys(result.data[0]).forEach(
    (eachKey) =>
      !excludeColumns.includes(eachKey) &&
      (tableHeadings.innerHTML += `<th>${eachKey.replace("_", " ")}</th>`)
  );
  tableHeadings.innerHTML += "<th>Price</th> <th>Add item</th>";
  productTable.append(tableHeadings);

  result.data.forEach((eachRow, index) => {
    const base64Image = JSON.stringify(eachRow.Image_file);
    const eachTableRow = `<tr data-product-id = ${
      eachRow.Product_id
    } data-category-id=${eachRow.Category_id} data-class-id=${
      eachRow.Class_id
    } >
        <td>${index + 1}</td>
        <td>${eachRow.Product_name}</td>
        <td>${eachRow.Product_code}</td>
        <td>${eachRow.Product_size}</td>
        <td>${eachRow.Product_qty}</td>
        <td>${eachRow.Product_rate}</td>
        <td>${eachRow.Product_company_name}</td>
        <td>${eachRow.Product_qty * eachRow.Product_rate}</td>
        <td><input type='checkbox' /></td>
       </tr>`;
    productTable.insertAdjacentHTML("beforeend", eachTableRow);
  });
}

veiwAllProducts();

function popupFortable() {
  document.getElementById("popup_table").style.display = "none";
}

function closeTable() {
  document.getElementById("popup_table").style.display = "none";
}