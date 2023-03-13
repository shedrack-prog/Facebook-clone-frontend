import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function SendEmail({
  loading,
  setLoading,
  userInfos,
  setVisible,
  error,
  setError,
  setMessage,
}) {
  const { email } = userInfos;
  const sendEmailHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/sendResetCode`,

        { email }
      );
      setMessage(data.message);
      setVisible(2);
      setLoading(false);
      setError('');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your Password?
          </div>
          <label htmlFor="email hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfos.picture} alt="" />
          <span>{userInfos.email} </span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: '10px' }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <span onClick={() => setVisible(0)} className="gray_btn">
          Not you?
        </span>
        <button
          type="submit"
          className="blue_btn"
          onClick={() => sendEmailHandler()}
        >
          {loading ? (
            <ScaleLoader color="#fff" loading={loading} size={25} />
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
}
