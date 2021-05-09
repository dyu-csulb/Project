/*===============================
  Delete record
=================================*/
function deleteRecord() {
    let data = {
      cusid: document.getElementById("txtId_edit").value
    }
    const url = '/api/delete';
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log(data);
      getData();
      getTotal();
      document.getElementById('btnClose').click();
        Swal.fire({
          title: 'Success',
          text: "Customer record has been deleted successfully!",
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


/*===============================
  Show Delete record warning message
=================================*/
function deleteRecordWarning() {
    Swal.fire({
      title: 'Delete record?',
      text: "Are you sure you want to delete this record? You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      customClass: 'swal-size-sm',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord();
      }
    })
  }

