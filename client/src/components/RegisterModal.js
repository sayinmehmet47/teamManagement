import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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
import { register } from '../Store/Actions/AuthActions';
import { clearErrors } from '../Store/Actions/ErrActions';

export const RegisterModal = (props) => {
  const { className } = props;
  const { msj } = useSelector((state) => state.err);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggle = useCallback(() => {
    setModal(!modal);
    dispatch(clearErrors());
  }, [modal, dispatch]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      name,
      email,
      password,
    };

    // Attempt to login
    dispatch(register(user));
  };

  useEffect(() => {
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [modal, isAuthenticated, toggle]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>{' '}
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>Registration</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              {msj.msg ? <Alert>{msj.msg}</Alert> : null}

              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleChangeName}
              />
              {msj.errors
                ? msj.errors.map((error) =>
                    error.param === 'name' ? (
                      <Alert key={error.value} color="danger">
                        {error.msg}
                      </Alert>
                    ) : null
                  )
                : null}

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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
