import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { v1 as uuid } from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, getItems } from '../Store/Actions/itemActions';
import { ItemModal } from './ItemModal';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  justify-content: center;
`;

export const ShoppingList = () => {
  const itemsFromRedux = useSelector((state) => state.items.item);
  const isLoading = useSelector((state) => state.items.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const deleteItems = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="mx-5">
      <ItemModal />
      {!isLoading ? (
        <ListGroup>
          <TransitionGroup>
            {itemsFromRedux.map((item, index) => {
              return (
                <CSSTransition key={index} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {isAuthenticated ? (
                      <Button
                        onClick={() => deleteItems(item._id)}
                        className="me-3"
                      >
                        ❌
                      </Button>
                    ) : null}

                    {/* <Button
                      onClick={() => deleteItems(item._id)}
                      className="me-3"
                    >
                      ❌
                    </Button> */}
                    {item.name}
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
    </div>
  );
};
