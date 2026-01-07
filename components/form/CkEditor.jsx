import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Field, ErrorMessage } from 'formik';
import Personalerror from '../Personalerror';

const CkEditor = ({ name, label, className, placeholder }) => {
  return (
    <Field name={name}>
      {({ form }) => (
        <div className={`col-12 ${className}`}>
          <CKEditor
            editor={ClassicEditor}
            data={form.values[name] || ''}
            onChange={(event, editor) => {
              form.setFieldValue(name, editor.getData());
            }}
            onBlur={() => form.setFieldTouched(name, true)}
            onFocus={() => {
              if (!form.values[name]) {
                form.setFieldValue(name, '');
              }
            }}
            config={{
              toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
              placeholder: `${label}: ${placeholder}`
            }}
          />
          <ErrorMessage name={name} component={Personalerror} />
        </div>
      )}
    </Field>
  );
};

export default CkEditor;
