import React from 'react';
import { useHasPermission } from '../src/hooks/permissionsHook';

const ActionIcon = ({icon,pTitle,...props}) => {
    const hasPer = useHasPermission(pTitle)
    return hasPer &&(
        <i className={`${icon}  mx-1 hoverable_text pointer has_tooltip`} data-bs-toggle="tooltip" data-bs-placement="top" 
        {...props}
        ></i>
    );
};

export default ActionIcon;