import { FastField } from 'formik';
import React from 'react';

const Checkbox = ({name,type,label}) => {
    return (
        <div className="form-check form-switch">
            <FastField className="form-check-input" type={type} name={name} />
            <label className="form-check-label" htmlFor="switchCheckDefault">{label}</label>
        </div>
    );
};

export default Checkbox;