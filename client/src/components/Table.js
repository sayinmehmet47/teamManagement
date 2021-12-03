import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayer } from "../Store/Actions/itemActions";
import { Alert } from "reactstrap";

let container = [{ name: "", age: "" }];

export const Table = ({ selected }) => {
  const id = useMemo(() => selected._id, [selected]);
  const dispatch = useDispatch();

  const itemsFromRedux = useSelector((state) =>
    state.items.item.filter((e) => e._id === id)
  )[0];
  let players = itemsFromRedux ? itemsFromRedux.players : "";
  let teamName = itemsFromRedux ? itemsFromRedux.name : "";
  const [deleted, setDeleted] = useState(false);

  const handleDelete = (cell) => {
    const playerName = cell.row.original.name;
    const teamName = cell.column.parent.Header;
    const willDelete = { playerName, teamName };
    // console.log(willDelete);
    dispatch(deletePlayer(willDelete));
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 2000);
  };

  const columns = useMemo(
    () => [
      {
        Header: teamName ? teamName : "TEAM NAME",

        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Delete",

            accessor: "_id",
            id: "_id",
            Cell: (row) =>
              players ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDelete(row.cell)}
                >
                  ❌
                </button>
              ) : (
                ""
              ),
          },
        ],
      },
    ],

    [teamName]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    nextPage,
    previousPage,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
  } = useTable(
    { columns, data: players ? players : container },
    useSortBy,
    usePagination
  );
  return (
    <div className="d-flex flex-column m-2 container ">
      {deleted ? <Alert className="alert">Player Deleted</Alert> : null}

      <table
        {...getTableProps()}
        style={{ borderRadius: "15px" }}
        className="table table-hover shadow"
      >
        <thead>
          {/* <tr className="text-center">{teamName}</tr> */}
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border"
                  style={{
                    background: "#f3f4f6",
                    color: "black",
                    paddingLeft: "12px",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border py-2 "
                      style={{
                        textDecorationLine: "none",
                        paddingLeft: "7px",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="mt-2 d-flex justify-content-center">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          ⬅ Previous
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          NextPage ➡
        </button>
      </div> */}
    </div>
  );
};
