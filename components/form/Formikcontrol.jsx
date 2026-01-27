import React from 'react';
import Select from './Select';
import Input from './Input';
import Textarea from './Textarea';
import File from './File';
import Switch from './Switch';
import Multiselect from '../Multiselect';
import Searchableselect from '../Searchableselect';
import CkEditor from './ckEditor';
import Date from './Date';
import Checkbox from './Checkbox';


const Formikcontrol = (props) => {
    switch (props.control) {
        case 'select':
            return <Select {...props} />
        case 'input':
            return <Input {...props} />
        case 'textarea':
            return <Textarea {...props} />
        case 'file':
            return <File {...props} />
        case 'switch':
            return <Switch {...props} />
        case 'multiselect':
            return <Multiselect {...props} />
        case 'searchableselect':
            return <Searchableselect {...props} />
        case 'ckeditor':
            return <CkEditor {...props} />
        case 'date':
            return <Date {...props} />
        case 'checkbox':
            return <Checkbox {...props} />
        default:
            return null
    }
};

export default Formikcontrol;