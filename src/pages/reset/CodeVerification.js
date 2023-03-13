import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../../compponents/inputs/loginInput';
import * as Yup from 'yup';
import ScaleLoader from 'react-spinners/ScaleLoader';
import axios from 'axios';

export default function CodeVerification({
  loading,
  setLoading,
  code,
  message,
  setMessage,
  setCode,
  error,
  setError,
  userInfos,
  setVisible,
}) {
  // senCode function
  const { email } = userInfos;
  const validateResetCodeHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/v1/auth/validateResetCode',
        {
          email,
          code,
        }
      );
      setLoading(false);
      setVisible(3);
      setError('');
      setMessage('');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      setMessage('');
    }
  };
  const validateCode = Yup.object({
    code: Yup.string()
      .required('verification code is required to continue')
      .min(5, 'must be 5 characters')
      .max(5, 'maximum of 5 characters'),
  });
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code verification</div>
      <div className="reset_form_text">
        Please enter code been sent to your Email.
      </div>
      <Formik
        enableReinitialize
        validationSchema={validateCode}
        initialValues={{ code }}
        onSubmit={() => validateResetCodeHandler()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              name="code"
              type="text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />

            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                {loading ? (
                  <ScaleLoader color="#fff" loading={loading} size={22} />
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
