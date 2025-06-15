import React, { useState } from 'react';

type AuthFormProps = {
  onSubmit: (email: string, password: string) => void;
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
