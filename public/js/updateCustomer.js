/*===============================
  Update record
=================================*/
function updateRecord() {
    let data = {
      cusid: document.getElementById("txtId_edit").value,
      cusfname: document.getElementById("txtFirstName_edit").value,
      cuslname: document.getElementById("txtLastName_edit").value,
      cusstate: document.getElementById("cboState_edit").value,
      cussalesytd: document.getElementById("txtSalesYTD_edit").value,
      cussalesprev: document.getElementById("txtPrevSalesYTD_edit").value    
    }
    const url = '/api/update';
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      getData();
      document.getElementById('btnClose').click();
      Swal.fire({
        title: 'Success',
        text: "Customer record has been updated successfully!",
        icon: 'success',
        showCancelButton: false,
        customClass: 'swal-size-sm',
        confirmButtonText: 'OK'
    })
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }