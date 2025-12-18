import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import Personalerror from '../Personalerror';

const File = ({ name, label, className, placeholder }) => {
    return (
        <FastField>
            {({ form }) => {
                return (
                    <div className={`col-12 ${className}`}>
                        <div className='input-group mb-3 dir_ltr'>
                            <input
                            type='file'
                            name={name} className='form-control' placeholder={placeholder}
                            onChange={(e)=>form.setFieldValue(name,e.target.files[0])}
                            />
                            <span className='input-group-text w-24 justify-center'>{label}</span>
                        </div>
                        <ErrorMessage name={name} component={Personalerror} />
                    </div>)

            }}
        </FastField>
    );
};

export default File;