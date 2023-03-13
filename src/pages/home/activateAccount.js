import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../compponents/header';
import LeftHome from '../../compponents/home/left';
import RightHome from '../../compponents/home/right';
import Stories from '../../compponents/home/stories';
import CreatePost from '../../compponents/createPost';
import ActivateForm from './ActivateForm';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ActivateAccount() {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/activateAccount`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setSuccess(data.message);
      setLoading(false);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({ type: 'VERIFY', payload: true });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setLoading(false);

      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded. Redirecting!"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
