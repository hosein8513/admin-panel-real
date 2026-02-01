import { ErrorMessage } from 'formik';
import React from 'react';
import Select from 'react-select';
import Personalerror from '../Personalerror';


const SelectSearchComp = ({options,placeholder,value,name,onChange,...props}) => {
    return (
        <>
       


            <Select options={options}  placeholder={placeholder}
                onChange={onChange} value={options.find(o=>o.value === value)||null}  {...props}/>
            <br />
            <ErrorMessage name={name} component={Personalerror} />
            
        </>
    );
};

export default SelectSearchComp;