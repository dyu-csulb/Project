function enableToolTip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  function hasClass(elem, className) {
    return elem.classList.contains(className);
}



function invalidEntryMsg(messagetext) {
  Swal.fire({
      title: 'Invalid Entry',
      text: messagetext,
      icon: 'warning',
      showCancelButton: false,
      customClass: 'swal-size-sm',
      confirmButtonText: 'OK'
  })
  // .then(function() {
  //   document.getElementById("txtFirstName_edit").focus();
  // });


}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) && 
         !isNaN(parseFloat(str)) 
}

