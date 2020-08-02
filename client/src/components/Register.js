import React, { useState, useContext } from 'react';
import { Button, FormGroup, Form, Label, Input } from 'reactstrap';
import { GlobalContext } from '../context/GlobalState.js';
import { useHistory } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(GlobalContext);

  let history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 6;
  }

  function signUp(event) {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    register(newUser);
    history.push('/myGames');
  }

  return (
    <div className="Login">
      <Form onSubmit={signUp}>
        <FormGroup id="name" size="large">
          <Label>Name</Label>
          <Input autoFocus type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup id="email" size="large">
          <Label>Email</Label>
          <Input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup id="password" size="large">
          <Label>Password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </FormGroup>
        <Button block size="large" disabled={!validateForm()} type="submit">
          Sign up
        </Button>
      </Form>
    </div>
  );
};
