import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import Personalerror from '../Personalerror';

const Input = ({type,name,label,className,placeholder}) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className='input-group mb-3 dir_ltr'>
                <FastField type={type} name={name} className='form-control' placeholder={placeholder}/>
                <span className='input-group-text w-24 justify-center'>{label}</span>
            </div>
            <ErrorMessage name={name} component={Personalerror}/>
        </div>
    );
};

export default Input;