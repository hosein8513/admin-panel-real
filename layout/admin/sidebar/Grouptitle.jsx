import React from 'react';
import { useHasPermission } from '../../../src/hooks/permissionsHook';

const Grouptitle = ({title,pTitles}) => {
        const hasPer = useHasPermission(pTitles)
    return hasPer && (
       
             <div className="py-1 text-start d-flex justify-content-center no_pointer no_hover sidebar-item">
                            <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
                        </div>
     
    );
};

export default Grouptitle;