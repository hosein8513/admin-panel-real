import React from 'react';
import { useHasPermission } from '../../src/hooks/permissionsHook';
import { Navigate } from 'react-router-dom';

const PerComponent = ({component,title}) => {
const hasper = useHasPermission(title)
    return hasper?component:<Navigate to={'/'}/>
};

export default PerComponent;