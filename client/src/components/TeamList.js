import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { v1 as uuid } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, getItems } from "../Store/Actions/itemActions";
import { ItemModal } from "./ItemModal";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { Table } from "./Table";
const override = css`
  display: flex;
  justify-content: center;
`;

export const TeamList = () => {
  const itemsFromRedux = useSelector((state) => state.items.item);
  const isLoading = useSelector((state) => state.items.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [selectedItem, setSelectedItem] = useState(itemsFromRedux[0]);
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
      <div className="row ">
        {!isLoading ? (
          <ListGroup className="col-6">
            <TransitionGroup>
              {itemsFromRedux.map((item, index) => {
                return (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="fade"
                    onClick={() => setSelectedItem(item)}
                  >
                    <ListGroupItem className="d-flex justify-content-between">
                      <div>
                        <div> {item.name}</div>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center ">
                          {isAuthenticated ? (
                            <Button className="me-3 d-flex flex-end">
                              Add Players ➕
                            </Button>
                          ) : null}
                          {isAuthenticated ? (
                            <Button
                              onClick={() => deleteItems(item._id)}
                              className="me-3 d-flex flex-end"
                            >
                              Delete Team ❌
                            </Button>
                          ) : null}
                        </div>
                      </div>
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
        <div className="col-4">
          <Table item={selectedItem} />
        </div>
      </div>
    </div>
  );
};
