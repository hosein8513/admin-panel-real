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

export const Confirm = (title, text) => {
  return Swal.fire({
    title: "آیا از انجام این عملیات مطمئن هستید؟",
    text: "این عملیات قابل بازگشت نخواهد بود!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله",
    cancelButtonText: "خیر"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title,
        text,
        icon: "success"
      });
      return true;
    }
    return false;
  });
};
