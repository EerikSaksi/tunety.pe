import React from 'react';
import Home from 'components/navigation/home.js'
import SelectedGeniusResult from 'components/navigation/selected_genius_result'
import CreateLyricsSync from 'components/lyrics/syncing/lyrics_sync_router.js/'
import GameEntry from 'components/lyrics/playing/game_entry/'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/g/:geniusID">
            <SelectedGeniusResult />
          </Route>
          <Route path="/s/:youtubeID/:geniusID">
            <CreateLyricsSync />
          </Route>
          <Route path="/p/:youtubeID/:geniusID">
            <GameEntry/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

