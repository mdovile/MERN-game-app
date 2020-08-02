import React, { useState, useContext } from 'react';
import { Button, FormGroup, Form, Label, Input } from 'reactstrap';
import { GlobalContext } from '../context/GlobalState.js';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { login } = useContext(GlobalContext);

  let history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userCredentials = {
      email,
      password,
    };
    if (await login(userCredentials)) {
      history.push('/myGames');
    } else {
      setError(true);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <Label>Email</Label>
          <Input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Label>Password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        {error ? 'Wrong username or password' : ''}
      </Form>
    </div>
  );
};
