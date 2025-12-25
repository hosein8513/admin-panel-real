import React from 'react';
import Colortable from './Colortable';
import Addcolor from './Addcolor';

const Colors = () => {
    return (
         <div id="manage_color_section" className="add_color_section main_section">
            <h4 className="text-center my-3">مدیریت رنگ ها</h4>
           <Colortable numofpage={3}/>
        </div>

    );
};

export default Colors;