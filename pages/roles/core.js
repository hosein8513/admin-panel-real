import { addRole } from "../../src/services/users"
import { SuccessAlert } from "../../utills/Alert"
import * as Yup from "yup";

export const initialValues = {
    title:'',
    descriuption:'',
    perimissions_id:[]
}

export const onSubmit = async(values,actions,setData)=>{
    const res = await addRole(values)
    if(res.status == 201){
        SuccessAlert("عملیات با موفقیت انجام شد")
        setData(old=>[...old,res.data.data])
    }
}

export const validationSchema = Yup.object()
.shape({
    title: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    description: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید")
})