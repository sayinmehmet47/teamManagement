import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from 'reactstrap';
import { LOGOUT_SUCCESS } from '../Store/Actions/actions';
import { login, register } from '../Store/Actions/AuthActions';

export const Logout = (props) => {
  const { buttonLabel, className } = props;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: LOGOUT_SUCCESS });
  };
  return (
    <div>
      <NavLink onClick={handleClick} href="#">
        Logout
      </NavLink>{' '}
    </div>
  );
};
