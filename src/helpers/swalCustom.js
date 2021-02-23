import Swal from 'sweetalert2';

export const swalCustomStyle = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success p-3 m-2',
      cancelButton: 'btn btn-outline-danger p-3 m-2',
      popup: "bg-color",
      title: "text-color",
      htmlContainer: "text-color"
    },
    buttonsStyling: false,
})