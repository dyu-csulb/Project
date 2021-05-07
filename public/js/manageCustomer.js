
window.addEventListener("load", bind);

function bind() {
    getTotal();
    enableToolTip();
}

function enableToolTip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
       return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function search() {
  getData();
}

function reset() {
    document.getElementById("txtId").value='';
    document.getElementById("txtFirstName").value='';
    document.getElementById("txtLastName").value='';
    document.getElementById("txtState").value='';
    document.getElementById("txtSalesYTD").value='';
    document.getElementById("txtPrevSalesYTD").value='';
    resetTable();
}

  
function getTotal() {
    const url = '/total';
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

function resetTable() {
    let table = document.getElementById('tblCustomers');
    while(table.childNodes.length>2){table.removeChild(table.lastChild);}
}

function filters() {
  let myObj = { 
    cusid: document.getElementById("txtId").value,
    cusfname: document.getElementById("txtFirstName").value,
    cuslname: document.getElementById("txtLastName").value,
    cusstate: document.getElementById("txtState").value,
    cussalesytd: document.getElementById("txtSalesYTD").value,
    cussalesprev: document.getElementById("txtPrevSalesYTD").value      
  };
  return myObj;
}

function getData() {
  resetTable();

  const url = '/search';
  let myObj = []  
  fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters())
  })
  .then(response => response.json())
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
      
        let btnEdit = document.createElement("button"); 
        btnEdit.innerHTML = "Edit" ;  
        btnEdit.className='btn btn-warning btn-sm edit'
        btnEdit.style = 'margin-right: 10px;'
        btnEdit.addEventListener('click', function (e) {
          if (hasClass(e.target, 'edit')) {
            alert(myObj[i].cusid)
          } 
        }, false);

        let btnDelete = document.createElement("button"); 
        btnDelete.innerHTML = "Delete"; 
        btnDelete.className='btn btn-danger btn-sm delete'
        btnDelete.addEventListener('click', function (e) {
          if (hasClass(e.target, 'delete')) {
            alert(myObj[i].cusid)
          } 
        }, false);

        td6.appendChild(btnEdit);
        tr.appendChild(td6); 
  
        td6.appendChild(btnDelete);
        tr.appendChild(td6); 

        console.log(myObj.length)
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      
      }
      table.appendChild(tableBody);
    }
    )
    .catch(function (err) {
      console.log('Fetch Error: ', err);
    })
  }

function hasClass(elem, className) {
    return elem.classList.contains(className);
}

// Swal.fire({
//     title: 'Success',
//     text: "Your request is successful!",
//     icon: 'success',
//     showCancelButton: false,
//     //confirmButtonColor: '#3085d6',
//     //cancelButtonColor: '#d33',
//     customClass: 'swal-size-sm',
//     confirmButtonText: 'OK'
// }).then((result) => {
//     if (result.isConfirmed) {
//         controllerManageModuleAccess.grid.refreshGrid();
//     }
// })
