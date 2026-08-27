import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import LoginInput from './LoginInput';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

describe('LoginInput component', () => {
  it('should render email and password input', () => {
    render(<LoginInput login={() => {}} />);

    expect(screen.getByPlaceholderText(/email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy();
  });
});

describe('RegisterInput component', () => {
  it('should call register function when button is clicked', async () => {
    const register = vi.fn();
    const user = userEvent.setup();

    render(<RegisterInput register={register} />);

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const registerButton = screen.getByRole('button', {
      name: /register/i,
    });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');

    await user.click(registerButton);

    expect(register).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
