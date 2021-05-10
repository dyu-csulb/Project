/*===============================
  Get record count total
=================================*/


function getTotal() {
    const url = '/api/total';
    fetch(url)
    .then(response => response.json())
    .then(result => {
      document.getElementById("lblTotal").innerHTML = "Total number of records in database: " + result[0].total;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}
