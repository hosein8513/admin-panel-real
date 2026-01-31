import { addNewDelivery, editDelivery } from "../../src/services/delivery"
import { SuccessAlert } from "../../utills/Alert"
import * as Yup from "yup";

export const initialValues = {
    title:'',
    amount:'',
    time:1,
    time_unit:'روز'
}

export const onSubmit = async(values,actions,setData,deliveryToEdit)=>{
    if(deliveryToEdit){
        const res = await editDelivery(deliveryToEdit.id,values)
        if(res.status == 200){
            SuccessAlert("عملیات با موفقیت انجام شد")
            setData(last=>{
                let newData= [...last]
                let index = newData.findIndex((d)=>d.id == deliveryToEdit.id)
                newData[index] = res.data.data
                return newData
            })
        }
    }else{
        const res = await addNewDelivery(values)
        if(res.status == 201){
            SuccessAlert("عملیات با موفقیت انجام شد")
            actions.resetForm()
            setData(old=>[...old,res.data.data])
        }
    }
}

export const validationSchema =Yup.object()
.shape({
    title: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    amount: Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    time: Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    time_unit: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
})