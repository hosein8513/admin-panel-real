import { FastField, ErrorMessage, Field } from 'formik';
import React from 'react';
import Personalerror from '../Personalerror';

const Select = ({ options, name, label, className, firstitem, handleonchange }) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className='input-group mb-3 dir_ltr'>
                <Field>
                    {({ form }) => {
                        return (
                            <Field as="select" className="form-control" id={name} name={name}
                                onChange={handleonchange ? (e) => handleonchange(e.target.value, form) : null}
                            >
                                <option value="">{firstitem}</option>
                                {options.map((a) => (
                                    <option key={a.id} value={a.id}>{a.value}</option>
                                ))}
                            </Field>

                        )
                    }}

                </Field>
                    <span className='input-group-text w-24 justify-center'>{label}</span>

            </div>
            <ErrorMessage name={name} component={Personalerror} />
        </div>
    );
};

export default Select;