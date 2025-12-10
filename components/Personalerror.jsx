import React from 'react';

const Personalerror = ({children}) => {
    return (
        <div className='text-center text-red-600'>
            {children}
        </div>
    );
};

export default Personalerror;