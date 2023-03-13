import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../compponents/inputs/loginInput';
import * as Yup from 'yup';
import ScaleLoader from 'react-spinners/ScaleLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function ChangePassword({
  password,
  setPassword,
  confPassword,
  setConfPassword,
  error,
  setMessage,
  setError,
  loading,
  setLoading,
  message,
  userInfos,
}) {
  useEffect(() => {
    setMessage('');
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // reset Password handler
  const { email } = userInfos;

  const resetPasswordHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/resetPassword`,
        {
          email,
          password,
          confPassword,
        }
      );
      setLoading(false);
      setError('');
      setMessage(data.message);
      setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage('');
      setError(error.response.data.message);
    }
  };

  const validatePasswords = Yup.object({
    password: Yup.string()
      .required('Enter new Password')
      .min(6, 'Enter at least 6 characters')
      .max(50, 'must be between 6 and 50 characters'),

    confPassword: Yup.string()
      .required('confirm password')
      .oneOf([Yup.ref('password')], 'passwords do not match'),
  });
  return (
    <div className="reset_form" style={{ height: '320px' }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        validationSchema={validatePasswords}
        initialValues={{ password, confPassword }}
        // onSubmit={() => resetPasswordHandler()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              name="password"
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              name="confPassword"
              type="password"
              placeholder="Confirm new password"
              onChange={(e) => setConfPassword(e.target.value)}
            />

            {error && <div className="error_text">{error}</div>}
            {message && <div className="error_text">{message}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button
                onClick={() => resetPasswordHandler()}
                type="submit"
                className="blue_btn"
              >
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
