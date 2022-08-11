import React from 'react';
import { Table } from 'reactstrap';

export default function TableComponent({ selected }) {
  const players = selected?.players;
  const name = selected?.name;

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
                  onClick={() => {
                    console.log('delete');
                  }}
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
