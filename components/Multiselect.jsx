import React, { useState } from 'react';
import Personalerror from './Personalerror';
import { ErrorMessage, Field } from 'formik';

const Multiselect = ({ result, options, name, label, className, firstitem }) => {
    const [selecteditems, setselecteditems] = useState([])

    const handleselectitems = (id, form) => {
        setselecteditems(old => {
            if (old.findIndex(d => d.id == id) == -1 && id>0) {
                const newData = [...old, options.filter(c => c.id == id)[0]]


                const selectedIds = newData.map(d => d.id)

                const nameValue = result == 'string'?selectedIds.join('-'):selectedIds
                form.setFieldValue(name,nameValue)


                return newData
            } else {
                return old
            }
        })

    }


    const handleremoveselectitems = (id, formik) => {
        setselecteditems(old => {
            let newData = old.filter(d => d.id != id)

            const selectedIds = newData.map(d => d.id)
            const nameValue = result == 'string'?selectedIds.join('-'):selectedIds
            formik.setFieldValue(name, nameValue)

            return newData
        })
    }

    return (
        <>
        <Field>
            {({form})=>{
                return(
                <>
                <div className='input-group mb-3 dir_ltr'>
                <select className="form-control" id={name + '-select'}
                    onChange={(e) => handleselectitems(e.target.value, form)}
                >
                    <option value="">{firstitem}</option>
                    {options.map((a) => (
                        <option key={a.id} value={a.id}>{a.value}</option>
                    ))}
                </select>
                <span className='input-group-text w-24 justify-center'>{label}</span>

            </div>
            <ErrorMessage name={name} component={Personalerror} />

            {
                selecteditems.map(category => (
                    <span className='chips_elem' key={category.id}>
                        <i className='fas fa-times text-danger' onClick={() => handleremoveselectitems(category.id, form)}></i>
                        {category.value}
                    </span>
                ))
            }
            </>
                )
            }}
            
            </Field>
        </>
    );
};

export default Multiselect;