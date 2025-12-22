import React from 'react';

const Showinfilter = ({rowdata}) => {
    return (
    <span className={rowdata.in_filter?'text-success':'text-danger'}>
        {rowdata.in_filter?'هست':"نیست"}
    </span>
    );
};

export default Showinfilter;