import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    // @TODO: dispatch async action to login
    const isSuccess = await dispatch(asyncSetAuthUser({ email, password }));

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section className="login-page">
      <div className="right-triangle" />
      <article className="login-page__main">
        <h2>
          See <strong>The World</strong>, <br />
          Through Open-Space.
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
      <div className="left-triangle" />
    </section>
  );
}
export default LoginPage;
