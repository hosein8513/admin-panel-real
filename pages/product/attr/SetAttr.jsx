import { ErrorMessage, Field, Form, Formik } from "formik";
 import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Personalerror from "../../../components/Personalerror";
import SubmitButton from "../../../components/form/Submitbutton";
import Backbutton from "../../../components/Backbutton";
import Loader from "../../../components/Loader";
import { initializingData } from "./core";
import { onSubmit } from "../core";
import * as Yup from "yup";



const SetAttribute = () => {
    const location = useLocation()
    const  {selectedProduct}  = location.state

    const [attrs, setAttrs] = useState()
    const [initialValues, setInitialValues] = useState(null)
    const [validationSchema, setValidationSchema] = useState({})

    const handleGetAttributes = async () => {
        const { attrsVar, initials, rules } = await initializingData(selectedProduct)
        setAttrs(attrsVar)
        setInitialValues(initials)
        setValidationSchema(Object.keys(initials).length > 0 ? Yup.object(rules) : {})
    }
    useEffect(() => {
        handleGetAttributes()
    }, [])
    return (
        <div className="container">
            <h4 className="text-center my-3"> افزودن ویژگی محصول: <span className="text-primary">{selectedProduct.title}</span> </h4>
            <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                <Backbutton />
            </div>
            <div className="row justify-content-center">
                {initialValues ? (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, selectedProduct.id)}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            {
                                attrs.map((attr, index) => (
                                    <div key={"group" + index} className="row justify-content-center">
                                        <h6 className="text-center">گروه : {attr.groupTitle}</h6>
                                        {
                                            attr.data.length > 0 ? (
                                                attr.data.map(attrData => (
                                                    <div className="col-12 col-md-6 col-lg-8" key={attrData.id}>
                                                        <div className="input-group my-3 dir_ltr">
                                                            <span className="input-group-text w_6rem justify-content-center"> {attrData.unit} </span>
                                                            <Field name={attrData.id} type="text" className="form-control" placeholder="" />
                                                            <span className="input-group-text w_8rem justify-content-center">{attrData.title}</span>
                                                        </div>
                                                        <ErrorMessage name={attrData.id} component={Personalerror} />
                                                    </div>
                                                ))
                                            ) : (
                                                <small className="text-center text-danger ">هیچ ویژگی برای گروه های این محصول ایجاد نشده است</small>
                                            )
                                        }
                                    </div>
                                ))
                            }

                            <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4 m-auto">
                                <SubmitButton />
                                <Backbutton className="me-2" />
                            </div>

                        </Form>
                    </Formik>
                ) : (
                    <Loader />
                )
                }
            </div>
        </div>
    );
};

export default SetAttribute;