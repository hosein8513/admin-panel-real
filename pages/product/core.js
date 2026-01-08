import * as Yup from 'yup'
import {
  createProduct,
  editProduct
} from '../../src/services/product';
import {
  SuccessAlert
} from '../../utills/Alert';

export const initialValue = {
  category_ids: '',
  title: '',
  price: '',
  weight: '',
  brand_id: '',
  color_ids: '',
  guarantee_ids: '',
  descriptions: '',
  short_descriptions: '',
  cart_descriptions: '',
  image:null,
  alt_image: '',
  keywords: '',
  stock: "",
  discount: ''
}

export const onSubmit = async (values, actions,productToEdit) => {
  console.log(values);
  
  if(productToEdit){
    const res = await editProduct(productToEdit.id,values)
  if (res.status == 200) {
    SuccessAlert('عملیات با موفقیت انجام شد')

  }
  }else{
    const res = await createProduct(values)
  if (res.status == 201) {
    SuccessAlert('عملیات با موفقیت انجام شد')

  }
  }
}

export const validationSchema = Yup.object({
  category_ids: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  price: Yup.number()
    .required("لطفا این قسمت را پر کنید"),
  weight: Yup.number(),
  brand_id: Yup.number(),
  color_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  guarantee_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  short_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  cart_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  image: Yup.mixed()
  .nullable()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg" ||value.type === "image/png"
    ),
  alt_image: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  keywords: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  stock: Yup.number(),
  discount: Yup.number(),
});