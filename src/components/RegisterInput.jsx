import React from 'react';
import PropTypes from 'prop-types';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FieldError } from './FieldError';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function RegisterInput({ register: onRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    onRegister(data);
  };

  return (
    <form className="register-input" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register('name')} />
      <FieldError message={errors.name?.message} />

      <input type="email" placeholder="Email" {...register('email')} />
      <FieldError message={errors.email?.message} />

      <input type="password" placeholder="Password" {...register('password')} />
      <FieldError message={errors.password?.message} />

      <button type="submit">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
