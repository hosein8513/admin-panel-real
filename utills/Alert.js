import Swal from "sweetalert2";

export const Alert = (text,title)=>{
    Swal.fire({
  icon: "error",
  title,
  text
});
}

export const SuccessAlert=(title)=>{
Swal.fire({
  title,
  icon: "success",
  draggable: true
});
}