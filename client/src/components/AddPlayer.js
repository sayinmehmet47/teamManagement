import React, { useState } from 'react';
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
} from 'reactstrap';
import { addPlayer } from '../Store/Actions/itemActions';
import socketIOClient from 'socket.io-client';

export const AddPlayer = (props) => {
  const { className, id } = props;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState('');

  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeAge = (e) => setAge(e.target.value);
  const toggle = () => {
    setModal(!modal);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const socket = socketIOClient.connect(process.env.REACT_APP_URL);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });

    // Create user object
    const player = {
      name,
      age,
    };

    dispatch(addPlayer(id, player));
    setModal(!modal);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button className="" color="success" onClick={toggle}>
          Add Player ➕
        </Button>
      ) : (
        <h4>Please login to manage items</h4>
      )}
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>Add a new player 🤸‍♀️</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="playerName">Name</Label>{' '}
              <Input
                type="text"
                onChange={handleChangeName}
                placeholder="Add a new item"
                rows={5}
              />
              <Label for="playerName">Age</Label>{' '}
              <Input
                type="number"
                onChange={handleChangeAge}
                placeholder="Add a new item"
                rows={5}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Player
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
