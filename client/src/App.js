import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppNavbar } from './components/AppNavbar';
import { TeamList } from './components/TeamList';
import { loadUser } from './Store/Actions/AuthActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:5000');

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
