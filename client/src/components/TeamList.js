import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItems } from '../Store/Actions/itemActions';
import { AddPlayer } from './AddPlayer';
import { ItemModal } from './ItemModal';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import { Table } from './Table';
import openSocket from 'socket.io-client';
const override = css`
  display: flex;
  justify-content: center;
`;

export const TeamList = () => {
  const itemsFromRedux = useSelector((state) => state.items.item);
  const isLoading = useSelector((state) => state.items.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [selectedItem, setSelectedItem] = useState('');
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    const socket = openSocket('https://team-management12.herokuapp.com/');
    socket.on('postsChannel', (data) => {
      if (data.action === 'deletingTeam') {
        dispatch({ type: 'DELETE_ITEM', payload: data.teamId });
      }
    });
  }, []);

  const deleteItems = (id) => {
    dispatch(deleteItem(id));
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 1000);
  };

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="mx-5 mb-5">
      {deleted ? <Alert className="alert">Team Deleted</Alert> : null}
      <ItemModal />
      <div className="row">
        {!isLoading ? (
          <ListGroup className="col-md-7">
            <TransitionGroup>
              {itemsFromRedux.map((item, index) => {
                return (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="fade"
                    onClick={() => handleSelectedItem(item)}
                  >
                    <ListGroupItem
                      className="d-flex justify-content-between shadow mb-2 rounded"
                      role="button"
                    >
                      <div>
                        <div className="text-secondary fs-4"> {item.name}</div>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center ">
                          {isAuthenticated ? <AddPlayer id={item._id} /> : null}
                          {isAuthenticated ? (
                            <Button
                              onClick={() => deleteItems(item._id)}
                              className="mx-3 d-flex flex-end"
                            >
                              Delete Team ❌
                            </Button>
                          ) : null}
                        </div>
                      </div>
                      <p className="">
                        Owner:
                        <span className="text-danger"> {item.owner.name}</span>
                      </p>
                    </ListGroupItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <div className="sw-loading">
            <BeatLoader css={override} size={20} />
          </div>
        )}
        <div className="col-md-4">{<Table selected={selectedItem} />}</div>
      </div>
    </div>
  );
};
