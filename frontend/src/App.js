import React from 'react';
import Home from './components/home.js'
import SelectedGeniusResult from './components/selected_genius_result'
import CreateLyricsSync from './components/lyrics_sync_router'
import VideoPlayerTest from './components/video_player_test'
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

