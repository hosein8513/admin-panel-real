import { ErrorMessage, Field } from 'formik';
import Personalerror from '../Personalerror';

const Checkbox = (props) => {
    const {name,label,options, className} = props;
    return (
        <div className={`mb-2 ${className} row`}>
            <label htmlFor={name} className="form-label">{label}</label>
            <ErrorMessage name={name}component={Personalerror} />
            <Field className="form-control" id={name} name={name}>
                {({field})=>{
                    return options.map(o=>(
                        <div className="d-inline-block col-md-6 col-xl-4 pb-1" key={o.id}>
                            <input 
                            className='form-check-input me-4 pointer'
                            type="checkbox" 
                            id={`${name}_${o.id}`}
                            {...field}
                            value={o.id}
                            checked={field.value.includes(""+o.id)}
                            />
                            <label htmlFor={`${name}_${o.id}`} className="mx-1 ms-4 pointer">{o.title}</label>
                        </div>
                    ))
                }}
            </Field>
        </div>
    );
}

export default Checkbox;