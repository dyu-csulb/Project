
window.addEventListener("load", bind);

/*===============================
  Bind Functions
=================================*/
function bind() {
  getTotal();
  enableToolTip();

  document.getElementById("btnAdd").addEventListener("click", showAddModal); 
  document.getElementById("btnDelete").addEventListener("click", deleteRecordWarning); 
  document.getElementById("btnSave").addEventListener("click", updateRecord); 
}

/*===============================
  Get Search Results
=================================*/
function search() {
  getData();
}

/*===============================
  Reset Search Filters
=================================*/
function reset() {
  document.getElementById("txtId").value='';
  document.getElementById("txtFirstName").value='';
  document.getElementById("txtLastName").value='';
  document.getElementById("cboState").value='';
  document.getElementById("txtSalesYTD").value='';
  document.getElementById("txtPrevSalesYTD").value='';
  document.getElementById("lblRecordsFound").innerHTML = "";
  resetTable();
}

/*===============================
  Show AddNew Customer Modal
=================================*/
function showAddModal() {
  document.getElementById("customerModalLabel").innerHTML = "Add Customer";
  let txtId_edit				= document.getElementById("txtId_edit");	
  let txtFirstName_edit 		= document.getElementById("txtFirstName_edit");
  let txtLastName_edit		= document.getElementById("txtLastName_edit"); 	
  let cboState_edit			= document.getElementById("cboState_edit"); 		
  let txtSalesYTD_edit		= document.getElementById("txtSalesYTD_edit");
  let txtPrevSalesYTD_edit	= document.getElementById("txtPrevSalesYTD_edit");

  txtFirstName_edit.readOnly=false	 		
  txtLastName_edit.readOnly=false			
  cboState_edit.disabled=false				
  txtSalesYTD_edit.readOnly=false			
  txtPrevSalesYTD_edit.readOnly=false	

  txtId_edit.value="";				
  txtFirstName_edit.value="";		
  txtLastName_edit.value="";		
  cboState_edit.value="";			
  txtSalesYTD_edit.value="";		
  txtPrevSalesYTD_edit.value=""

  document.getElementById("btnDelete").hidden = true
  document.getElementById("btnSave").hidden = false
  let editModal = new bootstrap.Modal(document.getElementById('customerModal'))
  editModal.show()

}

/*===============================
  Clear out Search table
=================================*/
function resetTable() {
  let table = document.getElementById('tblCustomers');
  while(table.childNodes.length>2){table.removeChild(table.lastChild);}
  document.getElementById("lblRecordsFound").innerHTML = "";
}


/*===============================
  Get search parameters into object
=================================*/
function filters() {
let myObj = { 
  cusid: document.getElementById("txtId").value,
  cusfname: document.getElementById("txtFirstName").value,
  cuslname: document.getElementById("txtLastName").value,
  cusstate: document.getElementById("cboState").value,
  cussalesytd: formatter.format(document.getElementById("txtSalesYTD").value),
  cussalesprev: formatter.format(document.getElementById("txtPrevSalesYTD").value)    
};
return myObj;
}


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
      alert(error);
    });
}

/*===============================
  Update record
=================================*/
function updateRecord() {
  let v_cussalesytd = document.getElementById("txtSalesYTD_edit").value;
  let v_cussalesprev = document.getElementById("txtPrevSalesYTD_edit").value;
  let data = {
    cusid: document.getElementById("txtId_edit").value,
    cusfname: document.getElementById("txtFirstName_edit").value,
    cuslname: document.getElementById("txtLastName_edit").value,
    cusstate: document.getElementById("cboState_edit").value,
    cussalesytd: v_cussalesytd,
    cussalesprev: v_cussalesprev    
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
    console.log(data);
    getData();
    document.getElementById('btnClose').click();
    Swal.fire({
      title: 'Success',
      text: "Customer record has been updated successfully!",
      icon: 'success',
      showCancelButton: false,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      customClass: 'swal-size-sm',
      confirmButtonText: 'OK'
  })
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

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
        //confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        customClass: 'swal-size-sm',
        confirmButtonText: 'OK'
    })
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}
/*==============================================================
  Get Search data from database, create table and add buttons. 
===============================================================*/
function getData() {
  resetTable();

  const url = '/api/search';
  let myObj = []  
  fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters())
  })
  .then(response => response.json())
  /*---------------------------------
       Need to Fix Issue here.. 
  ----------------------------------*/
  .then(data => data.forEach(e => 
      myObj.push({cusid: e.cusid, 
                  cusfname: e.cusfname, 
                  cuslname: e.cuslname,
                  cusstate: e.cusstate,
                  cussalesytd: e.cussalesytd,
                  cussalesprev: e.cussalesprev
                }),
    ),
  )
  .then(function () {
    let table = document.getElementById("tblCustomers");
    let tableBody = document.createElement('tbody');
    
    table.appendChild(tableBody);
  
    for (let i=0; i<myObj.length; i++){
      let tr = document.createElement('tr');
      let td0 = document.createElement('td');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');

      tableBody.appendChild(tr);
      
      for (let j=0; j<1; j++){
        td0.appendChild(document.createTextNode( myObj[i].cusid ));
        tr.appendChild(td0);
      }
      for (let j=1; j<2; j++){
        td1.appendChild(document.createTextNode( myObj[i].cusfname ));
        tr.appendChild(td1);
      }
      for (let j=2; j<3; j++){
        td2.appendChild(document.createTextNode( myObj[i].cuslname ));
        tr.appendChild(td2);
      }
      for (let j=3; j<4; j++){
        td3.appendChild(document.createTextNode( myObj[i].cusstate ));
        tr.appendChild(td3);
      }
      for (let j=4; j<5; j++){
        td4.appendChild(document.createTextNode( myObj[i].cussalesytd ));
        tr.appendChild(td4);
      }
      for (let j=5; j<6; j++){
        td5.appendChild(document.createTextNode( myObj[i].cussalesprev ));
        tr.appendChild(td5);
      
        let txtId_edit				    = document.getElementById("txtId_edit");
        let txtFirstName_edit 		= document.getElementById("txtFirstName_edit");
        let txtLastName_edit		  = document.getElementById("txtLastName_edit");
        let cboState_edit			    = document.getElementById("cboState_edit");
        let txtSalesYTD_edit		  = document.getElementById("txtSalesYTD_edit");
        let txtPrevSalesYTD_edit	= document.getElementById("txtPrevSalesYTD_edit");
        let editModal             = new bootstrap.Modal(document.getElementById('customerModal'))

        let btnEdit = document.createElement("button"); 
        btnEdit.innerHTML = "Edit" ;  
        btnEdit.className='btn btn-warning btn-sm edit'
        btnEdit.style = 'margin-right: 10px;'
        btnEdit.addEventListener('click', function (e) {
          if (hasClass(e.target, 'edit')) {
            txtId_edit.value			          = myObj[i].cusid
            txtFirstName_edit.value		 	    = myObj[i].cusfname
            txtLastName_edit.value				  = myObj[i].cuslname
            cboState_edit.value					    = myObj[i].cusstate
            txtSalesYTD_edit.value				  = myObj[i].cussalesytd
            txtPrevSalesYTD_edit.value			= myObj[i].cussalesprev
			
            txtFirstName_edit.readOnly=false	 		
            txtLastName_edit.readOnly=false			
            cboState_edit.disabled=false				
            txtSalesYTD_edit.readOnly=false			
            txtPrevSalesYTD_edit.readOnly=false		

            document.getElementById("customerModalLabel").innerHTML = "Edit Customer"
            document.getElementById("btnDelete").hidden = true
            document.getElementById("btnSave").hidden = false

            editModal.show()
          } 
        }, false);

        let btnDelete = document.createElement("button"); 
        btnDelete.innerHTML = "Delete"; 
        btnDelete.className='btn btn-danger btn-sm delete'
        btnDelete.addEventListener('click', function (e) {
          if (hasClass(e.target, 'delete')) {
            txtId_edit.value			          = myObj[i].cusid
            txtFirstName_edit.value		 	    = myObj[i].cusfname
            txtLastName_edit.value				  = myObj[i].cuslname
            cboState_edit.value					    = myObj[i].cusstate
            txtSalesYTD_edit.value				  = myObj[i].cussalesytd
            txtPrevSalesYTD_edit.value			= myObj[i].cussalesprev
			
            txtFirstName_edit.readOnly=true	 		
            txtLastName_edit.readOnly=true			
            cboState_edit.disabled=true				
            txtSalesYTD_edit.readOnly=true			
            txtPrevSalesYTD_edit.readOnly=true	

            document.getElementById("customerModalLabel").innerHTML = "Delete Customer"
            document.getElementById("btnSave").hidden = true
            document.getElementById("btnDelete").hidden = false
            
            editModal.show()
          } 
        }, false);

        td6.appendChild(btnEdit);
        tr.appendChild(td6); 
  
        td6.appendChild(btnDelete);
        tr.appendChild(td6); 

        document.getElementById("lblRecordsFound").innerHTML = "Number of records found: " + myObj.length;
        
        console.log(myObj);
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      
      }
      table.appendChild(tableBody);
    }
    )
    .catch(function (err) {
      console.log('Fetch Error: ', err);
    })
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

