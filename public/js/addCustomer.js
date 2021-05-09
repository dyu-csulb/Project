
function resetAddNew() {
  document.getElementById("txtId_edit").value 			="";
  document.getElementById("txtFirstName_edit").value 	="";
  document.getElementById("txtLastName_edit").value 	="";
  document.getElementById("cboState_edit").value 		="";
  document.getElementById("txtSalesYTD_edit").value 	="";
  document.getElementById("txtPrevSalesYTD_edit").value ="";
  document.getElementById("txtFirstName_edit").focus();
}

function validate() {
  if ((txtFirstName_edit.value).trim() ==='') {
    invalidEntryMsg('Please enter a first name!');
    txtFirstName_edit.focus()
  } 
  else if ((txtLastName_edit.value).trim()  ==='') {
    invalidEntryMsg('Please enter a last name!');
    txtLastName_edit.focus();
  }
  else if (cboState_edit.value ==='') {
    invalidEntryMsg('Please select a state!');
    cboState_edit.focus();
  }
  else if (isNumeric(((txtSalesYTD_edit.value).replace('$','').replace(',','')).replace('','0').trim()) ==false) {
    invalidEntryMsg('Please enter a valid money values for Sales YTD!');
    txtSalesYTD_edit.focus();
  }
  else if (isNumeric(((txtPrevSalesYTD_edit.value).replace('$','').replace(',','')).replace('','0').trim()) ==false) {
    invalidEntryMsg('Please enter a valid money values for Prev Sales YTD!');
    txtSalesYTD_edit.focus();
  }
  else {
    addRecord();
  }
}

function addRecord(callTotal) {
  const url = '/api/maxId';
  fetch(url)
  .then(response => response.json())
  .then(result => {
      document.getElementById("txtId_edit").value = result[0].maxid;
      let data = {
        cusid: document.getElementById("txtId_edit").value,
        cusfname: document.getElementById("txtFirstName_edit").value,
        cuslname: document.getElementById("txtLastName_edit").value,
        cusstate: document.getElementById("cboState_edit").value,
        cussalesytd: document.getElementById("txtSalesYTD_edit").value,
        cussalesprev: document.getElementById("txtPrevSalesYTD_edit").value    
      }
        /*-----------------------------
          --- Start AddNew Customer ---
        -------------------------------*/
          const url = '/api/add';
          fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          .then(result => {     
            if (callTotal==true) {
              document.getElementById("lblTotal").innerHTML = getTotal();
              getData(); 
            } 
              Swal.fire({
                title: 'Success',
                text: "Customer record has been added successfully!",
                icon: 'success',
                showCancelButton: false,
                customClass: 'swal-size-sm',
                confirmButtonText: 'OK'
            })
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      })
      /*-----------------------------
        --- End AddNew Customer ---
      -------------------------------*/
  .catch((error) => {
    console.log('Error:', error);
    alert(error);
  });
}



  