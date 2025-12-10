import React from 'react';
import Input from './Input';
import Checkbox from './Checkbox';

const Authform = (props) => {
    
    switch(props.control){
    case "input":
        return (
        <div className='flex flex-col justify-center items-center w-full'>
        <Input {...props}/>
        </div>)
        case"checkbox":
        return(
            <div className='flex flex-col justify-center items-center w-full'>
        <Checkbox {...props}/>
        </div>)
        
        
        default:
          return null
  }


    
};

export default Authform;