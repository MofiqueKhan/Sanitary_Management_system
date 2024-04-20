const URL = 'http://localhost:8081';
const form = document.getElementById('submit-form');

async function getBase64IMG(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const filePromise = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
  return await filePromise;
}

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const formData = new FormData(form);
    const requestObj = {};
    for (let [eachKey, eachValue] of formData) {
      requestObj[eachKey] = eachValue;
    }
    requestObj.imageBlob = await getBase64IMG(requestObj.imageBlob);
    const requestHeader = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(requestObj),
    };
    const response = await fetch(URL + '/add-item', requestHeader);
    const result = await response.json();
    console.log(result);
    location.reload();
  } catch (err) {
    console.log(err);
  }
});
