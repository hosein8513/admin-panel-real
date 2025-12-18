import { FastField, ErrorMessage } from 'formik';
import React from 'react';
import Personalerror from '../Personalerror';

const Select = ({ options, name, label, className }) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className='input-group mb-3 dir_ltr'>
                <FastField as="select" className="form-control" id={name} name={name}>
                    <option value="">دسته والد را انتخاب کنید</option>
                    {options.map((a) => (
                        <option key={a.id} value={a.id}>{a.value}</option>
                    ))}
                </FastField>
                <span className='input-group-text w-24 justify-center'>{label}</span>
            </div>
            <ErrorMessage name={name} component={Personalerror} />
        </div>
    );
};

export default Select;