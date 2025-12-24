import * as Yup from 'yup'
import { addCtegoryAtr, editCategoryAtr } from '../../../src/services/categoryAtr'
import { SuccessAlert } from '../../../utills/Alert'



export const initialvalue = {
    title: '',
    unit: '',
    in_filter: ''
}

export const onSubmit = async (values, action, id, setdata, editAtr, setEditAtr) => {
    try {
        values = {
            ...values,
            in_filter: values.in_filter ? 1 : 0
        }
        if (editAtr) {
            const res = await editCategoryAtr(editAtr.id, values)
            if (res.status == 200) {
                setdata((old) => {
                    const newData = [...old]
                    const index = newData.findIndex((d) => d.id === editAtr.id)
                    newData[index] = res.data.data
                    return newData
                })
                SuccessAlert("ویژگی با موفقیت ویرایش شد")
                setEditAtr(null)
            }
        } else {
            const res = await addCtegoryAtr(id, values)
            if (res.status == 201) {
                SuccessAlert("ویژگی با موفقیت اضافه شد")
                setdata((old) => [...old, res.data.data])
                action.resetForm()
            }
        }
    } catch (err) {
        console.log(err);

    }
}

export const validationSchema = Yup.object({
    title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    unit: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z0-9\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    in_filter: Yup.boolean()

})