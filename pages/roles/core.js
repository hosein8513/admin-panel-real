import {
    addRole,
    editRolePermitions,
    editRoleService
} from "../../src/services/users"
import {
    SuccessAlert
} from "../../utills/Alert"
import * as Yup from "yup";

export const initialValues = {
    title: "",
    description: "",
    permissions_id: [],
};


export const onSubmit = async (values, actions, setData, editRole, editType) =>{
    if (editType == 'role') {
        const res = await editRoleService(editRole, values)
        if (res.status == 200) {
            SuccessAlert("عملیات با موفقیت انجام شد")
            setData(last => {
                let newData = [...last]
                let index = newData.findIndex((d) => d.id == editRole)
                newData[index] = res.data.data
                return newData
            })
        }
    }else if(editType == "permissions"){
        const res = await editRolePermitions(editRole,values)
        if(res.status == 200){SuccessAlert("عملیات با موفقیت انجام شد")}

     } else{
        const res = await addRole(values)
        if (res.status == 201) {
            SuccessAlert("عملیات با موفقیت انجام شد")
            setData(old => [...old, res.data.data])
        }
    }
}
export const validationSchema = Yup.object().shape({
    // title: Yup.string().when('editPermissions', {
    //     is: true,
    //     then: null,
    //     otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
    //     .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    // }),        
    // description: Yup.string().when('editPermissions', {
    //     is: true,
    //     then: null,
    //     otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
    //     .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    // }),
    // permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید")
})