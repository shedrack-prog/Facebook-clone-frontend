import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import LoginInput from '../../compponents/inputs/loginInput';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function SearchAccount({
  email,
  setEmail,
  error,
  loading,
  setLoading,
  setUserInfos,
  setError,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required('Enter your Email to continue')
      .email('Enter a valid Email')
      .max(50, " Email can't be more than 50 characters"),
  });

  //   Find User function
  const findUserHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/auth/findUser`,
        { email }
      );
      setError('');
      setLoading(false);
      setUserInfos(data);
      setVisible(1);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account
      </div>
      <Formik
        enableReinitialize
        validationSchema={validateEmail}
        initialValues={{ email }}
        onSubmit={() => findUserHandler()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              name="email"
              type="text"
              placeholder="Registered Email or mobile number"
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button
                type="submit"
                className="blue_btn"
                style={{
                  background: `${loading ? '#4287cc' : ''} `,
                }}
              >
                {loading ? (
                  <ScaleLoader color="#fff" loading={loading} size={25} />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
