import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import LoginInput from '../../compponents/inputs/loginInput';
import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import ChangePassword from './ChangePassword';

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [userInfos, setUserInfos] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState('');

  //   logout handler
  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.set('user', '');
    navigate('/login');
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={() => logoutHandler()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            setVisible={setVisible}
            loading={loading}
            setLoading={setLoading}
            userInfos={userInfos}
            error={error}
            setError={setError}
            setMessage={setMessage}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            loading={loading}
            setLoading={setLoading}
            message={message}
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            userInfos={userInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            confPassword={confPassword}
            setPassword={setPassword}
            setConfPassword={setConfPassword}
            error={error}
            message={message}
            loading={loading}
            setLoading={setLoading}
            setMessage={setMessage}
            setError={setError}
            userInfos={userInfos}
          />
        )}
      </div>
    </div>
  );
}
