const useValidateForm = (formik) => {
  const errors = formik.errors;
  const touched = formik.touched;

  const isValidated = (fieldName) => {
    return Object.keys(touched).includes(fieldName) && Object.keys(errors).includes(fieldName);
  };

  const validate = (fieldName) => {
    if (!isValidated(fieldName)) return { help: '', validateStatus: 'success ' };
    return { help: formik.errors[fieldName], validateStatus: 'error' };
  };
  return { validate };
};

export default useValidateForm;
