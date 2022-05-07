import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { login } from '../Store/Actions/AuthActions';
import { clearErrors } from '../Store/Actions/ErrActions';

export const LoginModal = (props) => {
  const { buttonLabel, className } = props;
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { msj } = useSelector((state) => state.err);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggle = useCallback(() => {
    setModal(!modal);
    dispatch(clearErrors());
  }, [modal, dispatch]);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to login
    dispatch(login(user));
  };

  useEffect(() => {
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [modal, isAuthenticated, toggle]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>{' '}
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              {msj.msg ? <Alert>{msj.msg}</Alert> : null}
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChangeEmail}
              />
              {msj.errors
                ? msj.errors.map((error) =>
                    error.param === 'email' ? (
                      <Alert key={error.value} color="danger">
                        {error.msg}
                      </Alert>
                    ) : null
                  )
                : null}

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              {msj.errors
                ? msj.errors.map((error) =>
                    error.param === 'password' ? (
                      <Alert key={error.value} color="danger">
                        {error.msg}
                      </Alert>
                    ) : null
                  )
                : null}

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
