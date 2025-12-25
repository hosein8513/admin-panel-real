
import { addNewColor, editColors } from "../../src/services/color"
import {
    SuccessAlert
} from "../../utills/Alert"
import * as Yup from 'yup'

export const initialValues = {
    title: '',
    code: ''
}

export const onSubmit = async (values, actions, setdata, editColor) => {
    if (editColor) {
        const res = await editColors(editColor.id, values)
        if (res.status == 200) {
            SuccessAlert('ویرایش با موفقیت انجام شد')
            setdata(last => {
                let newData = [...last]
                let index = newData.findIndex(d => d.id == editColor.id)
                newData[index] = res.data.data
                return newData
            })
        }
    } else {
        const res = await addNewColor(values)
        if (res.status == 201) {
            SuccessAlert('عملیات با موفقیت انجام شد')
            setdata(last => [...last, res.data.data])
        }
    }
}


export const validationSchema = Yup.object({
    title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z0-9\u0600-\u06FF\u200C]+$/, 'فقط از حروف و اعداد استفاده کنید'),
    code: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[\x20-\x7E]+$/, 'فقط حروف انگلیسی و اعداد و علائم مجاز است')
})