import { FastField } from 'formik';
import React from 'react';
import Loader from '../Loader';

const SubmitButton = () => {
    return (
        <FastField>
        {({ form }) => {
          return (
            <button type="submit" className="btn btn-primary btn-sm" disabled={form.isSubmitting}>
              ذخیره
              {form.isSubmitting ? <Loader colorClass={"text-white"} size={true} inline={true}/> : null}
            </button>
          );
        }}
      </FastField>
    );
}

export default SubmitButton;