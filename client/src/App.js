import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppNavbar } from "./components/AppNavbar";
import { TeamList } from "./components/TeamList";
import { loadUser } from "./Store/Actions/AuthActions";
import { ADD_ITEM } from "./Store/Actions/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import openSocket from "socket.io-client";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    const socket = openSocket("http://localhost:5000");
    socket.on("postsChannel", (data) => {
      if (data.action === "creatingTeam") {
        dispatch({ type: ADD_ITEM, payload: data.team });
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <TeamList />
    </div>
  );
}

export default App;
