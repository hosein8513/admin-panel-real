import React from 'react';
import Personalerror from '../Personalerror';
import { ErrorMessage, FastField } from 'formik';

const Textarea = ({ name, label, className, placeholder }) => {
    return (
       <div className={`col-12 ${className}`}>
            <div className='input-group mb-3 dir_ltr'>
                <FastField as='textarea' name={name} className='form-control' placeholder={placeholder}/>
                <span className='input-group-text w-24 justify-center'>{label}</span>
            </div>
            <ErrorMessage name={name} component={Personalerror}/>
        </div>
    );
};

export default Textarea;