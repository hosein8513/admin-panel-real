import { createNewCategory, editCategory } from "../../src/services/category"
import { Alert, SuccessAlert } from "../../utills/Alert"
import * as Yup from 'yup';

export const initialvalue = {
    parent_id: '',
    title: '',
    description: '',
    image: null,
    is_active: true,
    show_in_menu: true,
}
export const onsubmit = async (values, actions, setForceRender,editId) => {
    try {
        values = {
            ...values,
            is_active: values.is_active ? 1 : 0,
            show_in_menu: values.show_in_menu ? 1 : 0

        }
        if(editId){
            const res = await editCategory(editId,values)
            if(res.status == 200){
                SuccessAlert(` ${res.data.message}`)
                setForceRender((last)=>last+1)
            }
        }else
       { const res = await createNewCategory(values)
        if (res.status == 201) {
            SuccessAlert("عملیات با موفقیت انجام شد")
            actions.resetForm()
            setForceRender(last => last + 1)
        }}
    } catch (error) {
        console.log(error.massage);
    }
}

export const validationschema = Yup.object({
    parent_id: Yup.number(),
    title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    description: Yup.string().matches(/^[A-Za-z0-9\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    image: Yup.mixed()
        .nullable()
        .notRequired()
        .test(
            "filesize",
            "حجم فایل نمیتواند بیشتر از 500 کیلو بایت باشد",
            (value) => !value ? true : (value.size <= 500 * 1024)
        )
        .test(
            "format",
            "فرمت فایل باید jpg باشد0",
            (value) => !value ? true : (value.type === "image/jpeg")
        ),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean()

})
