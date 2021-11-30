import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

const container = [
  { name: "Ali", age: "22" },
  { name: "veli", age: "32" },
];

export const Table = () => {
  const data = useMemo(() => [...container], []);

  const columns = useMemo(
    () => [
      {
        Header: "Players",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Ages",
        accessor: "age", // accessor is the "key" in the data
      },
    ],
    []
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
  } = useTable({ columns, data }, useSortBy, usePagination);
  return (
    <div className="d-flex flex-column m-2">
      <thead
        className="border text-center"
        style={{
          background: "#838485",
          color: "white",
          paddingLeft: "12px",
        }}
      >
        X TEAM
      </thead>

      <table {...getTableProps()} style={{ borderRadius: "15px" }}>
        <thead>
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
