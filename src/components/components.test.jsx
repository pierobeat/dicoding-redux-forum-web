import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import LoginInput from './LoginInput';
import RegisterInput from './RegisterInput';
import VoteButtons from './VoteButtons';

afterEach(() => {
  cleanup();
});

describe('LoginInput component', () => {
  it('should render email and password input', () => {
    render(<LoginInput login={() => {}} />);

    expect(screen.getByPlaceholderText(/email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy();
  });

  it('should call login function when button is clicked', async () => {
    const login = vi.fn();
    const user = userEvent.setup();

    render(<LoginInput login={login} />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');

    await user.click(loginButton);

    expect(login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
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

describe('VoteButtons component', () => {
  it('should render upvote and downvote counts', () => {
    render(
      <VoteButtons
        upVotesBy={['users-1', 'users-2', 'users-3']}
        downVotesBy={['users-4']}
        onVote={() => {}}
      />,
    );

    expect(screen.getByLabelText('upvote').textContent).toBe('3');
    expect(screen.getByLabelText('downvote').textContent).toBe('1');
  });

  it('should call onVote when upvote button is clicked', async () => {
    const onVote = vi.fn();
    const user = userEvent.setup();

    render(<VoteButtons upVotesBy={[]} downVotesBy={[]} onVote={onVote} />);

    await user.click(
      screen.getByRole('button', {
        name: /upvote/i,
      }),
    );

    expect(onVote).toHaveBeenCalledWith(1);
  });
});
