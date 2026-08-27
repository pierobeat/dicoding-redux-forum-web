import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    // @TODO: dispatch async action to register
    const isSuccess = await dispatch(
      asyncRegisterUser({ name, email, password }),
    );

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <div className="right-triangle" />
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </article>
      <div className="left-triangle" />
    </section>
  );
}

export default RegisterPage;
