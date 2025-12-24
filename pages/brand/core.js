import {
    addNewBrand
} from "../../src/services/brands"
import {
    SuccessAlert
} from "../../utills/Alert"
import * as Yup from 'yup'

export const initialValues = {
    original_name:'',
    persian_name: '',
    descriptions: '',
    logo: null
}

export const onSubmit = async (values, actions, setdata) => {
    const res = await addNewBrand(values)
    if (res.status == 201) {
        SuccessAlert('عملیات با موفقیت انجام شد')
        setdata(last => [...last, res.data.data])
    }
}

export const validationSchema = Yup.object({
    original_name:Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z\s]+$/,'فقط حروف انگلیسی مجاز است'),
    persian_name: Yup.string().required("لطفا این قسمت را پر کنید").matches(/^[\u0600-\u06FF\u200C]+$/, 'لطفا از حروف فارسی استفاده کنید'),
    descriptions: Yup.string().matches(/^[A-Za-z0-9\u0600-\u06FF\u200C]+$/, 'فقط از حروف و اعداد استفاده کنید'),
    logo: Yup.mixed()
        .test('filesize', 'حجم فایل نمیتواند بیشتر از 500 کیلو بایت باشد', (value) => !value ? true : value.size <= 500 * 1024)
        .test('format', 'فرمت فایل باید jpg باشد', (value) =>
            !value ? true : value.type == 'image/jpeg' || value.type == 'image/png'
        ).notRequired()

})