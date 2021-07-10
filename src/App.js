import { Redirect, Router } from '@reach/router';

import './App.css';

import AllTeams from './views/AllTeams';
import TeamRoster from './views/TeamRoster';
import PlayerDetail from './views/PlayerDetail';
import Main from './views/Main';

function App() {
  return (
    <div style = {{ width: '80%', margin: '0 auto' }}>
      <Router>
        <Redirect from = '/' to = '/home' noThrow = 'true' />
        <Main path = '/home' />
        <AllTeams path = '/teams' />
        <TeamRoster path = '/teams/:id/roster' />
        <PlayerDetail path = '/players/:id' />
      </Router>
    </div>
  );
}

export default App;
