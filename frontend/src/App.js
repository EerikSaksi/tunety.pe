import React from 'react';
import Home from 'components/navigation/home.js'
import SelectedGeniusResult from 'components/navigation/selected_genius_result'
import CreateLyricsSync from 'components/lyrics/syncing/lyrics_sync_router.js/'
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
          <Route path="/g/:id">
            <SelectedGeniusResult />
          </Route>
          <Route path="/s/:y/:g">
            <CreateLyricsSync />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

