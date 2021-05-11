
window.addEventListener("load", bind);
/*===============================
  Bind Functions
=================================*/
function bind() {
  getTotal();
  document.getElementById("summary").hidden = true;


    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();

      document.getElementById("result").innerHTML ="";

      const formData = new FormData(e.target);
      Swal.fire({
        title: 'Importing file...',
        allowOutsideClick: false,
        text: "Your file is being uploaded..please wait..",
        showCancelButton: false,
        showConfirmButton: false,
        onBeforeOpen: () => {

            Swal.showLoading()
            fetch("/ImportFile", {
              method: "POST",
              body: formData
            })
              .then(response => response.text())
              .then(data => {
                  const resultElement = document.getElementById("result");
                  document.getElementById("summary").hidden = false;
                  swal.close()
                  if (data.substring(0,5) === "Error") {
                      resultElement.innerText = `Error occurred!  ${data}`
                  } else {
                      resultElement.innerText = data;
                  };
              })
              .catch(err => {
                  document.getElementById("message").textContent = `Error: ${err.message}`;
              });

        },
    });
 
    });

}
