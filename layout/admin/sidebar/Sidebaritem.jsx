import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHasPermission } from '../../../src/hooks/permissionsHook';

const Sidebaritem = ({title,icon,targetpath,pTitle}) => {
    const hasPer = useHasPermission(pTitle)
    return hasPer && (
        
             <NavLink to={targetpath} className="py-1 text-start pe-4 sidebar_menu_item sidebar-item" >
                            <i className={`ms-3 icon ${icon} text-light`}></i>
                            <span className="hiddenable no_wrap font_08">{title}</span>
                        </NavLink>
        
    );
};

export default Sidebaritem;