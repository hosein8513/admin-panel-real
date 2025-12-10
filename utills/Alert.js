import Swal from "sweetalert2";

export const Alert = (text,title)=>{
    Swal.fire({
  icon: "error",
  title,
  text
});
}