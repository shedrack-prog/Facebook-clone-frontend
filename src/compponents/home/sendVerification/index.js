import axios from 'axios';
import { useState } from 'react';
import './styles.css';

export default function SendVerification({ user }) {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/resendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
