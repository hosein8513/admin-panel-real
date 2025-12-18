import { FastField } from 'formik';
import React from 'react';

const Switch = ({ name, label }) => {
    return (

        <div className='form-check form-switch gap-12'>
            <FastField name={name} className='form-check-input m-4'
                type='checkbox'
            />
            <label className='form-check-label'>{label}</label>

        </div>
    );
};

export default Switch;