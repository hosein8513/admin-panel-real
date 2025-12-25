import { addNewGuarantie, editGuaraties } from "../../src/services/guarantie"
import { SuccessAlert } from "../../utills/Alert"
import * as Yup from 'yup'

export const initialValues = {
   title:'',
   descriptions:'',
   length:'',
   length_unit:''
}

export const onSubmit = async (values, actions, setdata,editGuaratie) => {
     if (editGuaratie) {
            const res = await editGuaraties(editGuaratie.id, values)
            if (res.status == 200) {
                SuccessAlert('ویرایش با موفقیت انجام شد')
                setdata(last => {
                    let newData = [...last]
                    let index = newData.findIndex(d => d.id == editGuaratie.id)
                    newData[index] = res.data.data
                    return newData
                })
            }}
   else{
        const res = await addNewGuarantie(values)
        if (res.status == 201) {
            SuccessAlert('عملیات با موفقیت انجام شد')
            setdata(last => [...last, res.data.data])
        }}
    }


export const validationSchema = Yup.object({
   title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z0-9\u0600-\u06FF\u200C]+$/, 'فقط از حروف و اعداد استفاده کنید'),
    descriptions: Yup.string().matches(/^[A-Za-z0-9\u0600-\u06FF\u200C]+$/, 'فقط از حروف و اعداد استفاده کنید'),
    length:Yup.string().required("لطفا این بخش را کامل کنید").matches(/^[0-9]+$/,'فقط از اعداد استفاده کنید'),
    length_unit:Yup.string().matches(/^[\u0600-\u06FF\u200C]+$/, 'لطفا از حروف فارسی استفاده کنید')

})