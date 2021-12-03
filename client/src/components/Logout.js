import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "reactstrap";
import { LOGOUT_SUCCESS } from "../Store/Actions/actions";

export const Logout = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: LOGOUT_SUCCESS });
  };
  return (
    <div>
      <NavLink onClick={handleClick} href="#">
        Logout
      </NavLink>{" "}
    </div>
  );
};
