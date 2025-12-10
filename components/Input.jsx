import { Field, ErrorMessage } from 'formik';
import Personalerror from './Personalerror';

const Input = ({ label, name, type }) => {
  return (
    <div className="flex flex-col w-full mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <Field name={name}>
        {({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition border-gray-200"
          />
        )}
      </Field>

      <ErrorMessage name={name} component={Personalerror} />
    </div>
  );
};

export default Input;