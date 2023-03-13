import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../compponents/inputs/loginInput';
// import './styles.css';
import * as Yup from 'yup';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';

const initialState = {
  email: '',
  password: '',
};
export default function LoginForm({ setVisible }) {
  const url = 'http://localhost:8000/api/v1';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });
      setLoading(false);
      const { message, ...rest } = data;
      setSuccess(message);
      Cookies.set('user', JSON.stringify(rest));
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        navigate('/');
      }, 1000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  const [user, setUSer] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUSer({ ...user, [name]: value });
  };

  const { email, password } = user;
  const loginValidation = Yup.object({
    email: Yup.string()
      .email('Please provide a valid email')
      .required('Email is required'),
    password: Yup.string().required('Please provide your password'),
  });
  return (
    <div
      className="login_wrap"
      style={{ opacity: `${loading ? '0.95' : '1'}` }}
    >
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
            onSubmit={() => loginHandler()}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  placeholder="Email address or phone number"
                  name="email"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  bottom
                />
                <button
                  type="submit"
                  className="blue_btn"
                  style={{
                    background: `${loading ? '#4287cc' : ''} `,
                    marginTop: '1rem',
                  }}
                >
                  {loading ? (
                    <ScaleLoader color="#fff" loading={loading} size={30} />
                  ) : (
                    'Log In'
                  )}
                </button>

                {error && (
                  <div className="error_text" style={{ fontSize: '19px' }}>
                    {error}
                  </div>
                )}
                {success && (
                  <div className="success_text" style={{ fontSize: '19px' }}>
                    {success}
                  </div>
                )}
              </Form>
            )}
          </Formik>

          <Link to="/reset" className="forgot_password">
            Forgotten password
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup "
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}
