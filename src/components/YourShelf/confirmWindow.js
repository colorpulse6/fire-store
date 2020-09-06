import Swal from "sweetalert2";
import ButtonStyles from "../../constants/buttons.module.scss";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: ButtonStyles.removeBook,
    cancelButton: ButtonStyles.buttonPrimary,
  },
  buttonsStyling: false,
});

function confirmWindowShelf(
  index,
  cbFunction,
  title,
  text,
  confirmButtonText,
  action,
  actionMessage,
  safeMessage
) {
  swalWithBootstrapButtons
    .fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(action, actionMessage, "success");
        cbFunction(index);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire("Cancelled", safeMessage, "error");
      }
    });
}

function confirmWindowDetails(
  cbFunction,
  title,
  
  
  actionMessage,
  
  url,
  id,
  bookTitle,
  authors,
  imageLinks
) {
  swalWithBootstrapButtons
    .fire({
      title,
      text: "It might get confusing!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire("Book Added", actionMessage, "success");
        cbFunction(url, id, bookTitle, authors, imageLinks);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire("Cancelled", "Your book has not been added :)", "error");
      }
    });
}

export { confirmWindowShelf, confirmWindowDetails, swalWithBootstrapButtons };
