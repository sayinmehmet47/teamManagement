import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppNavbar } from './components/AppNavbar';
import { TeamList } from './components/TeamList';
import { loadUser } from './Store/Actions/AuthActions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <AppNavbar />
      <TeamList />
    </div>
  );
}

export default App;
