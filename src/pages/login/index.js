import { useState } from 'react';
import Footer from '../../compponents/login/Footer';
import LoginForm from '../../compponents/login/loginForm';
import RegisterForm from '../../compponents/login/RegisterForm';
import './styles.css';

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}
