import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { deleteItem, deletePlayer } from '../Store/Actions/itemActions';

export default function TableComponent({ id }) {
  const dispatch = useDispatch();
  const { players, name } = useSelector(
    (state) => state.items.item.find((item) => item._id === id) || {}
  );

  const handleDelete = (playerName) => {
    dispatch(deletePlayer({ playerName, teamName: name }));
  };

  return (
    <div>
      <h3>{name}</h3>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Age</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(player.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
