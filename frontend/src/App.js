import React, {Suspense} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Loading from 'components/universal/loading'

const SelectedGeniusResult = React.lazy(() => import('components/navigation/selected_genius_result'))
const CreateLyricsSync = React.lazy(() => import('components/lyrics/syncing/lyrics_sync_router.js/'))
const GameEntry = React.lazy(() => import('components/lyrics/playing/game_entry/'))
const Home = React.lazy(() => import('components/navigation/home'));

const centeredLoading =
  <div style = {{left: 0, right: 0}}>
    <div style = {{position: 'absolute', left: '50%', transform: 'translate(-50%, 0px)'}}><Loading /></div>
  </div>

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={centeredLoading}>
              <Home />
            </Suspense>
          </Route>
          <Route path="/g/:geniusID">
            <Suspense fallback={centeredLoading}>
              <SelectedGeniusResult />
            </Suspense>
          </Route>
          <Route path="/s/:youtubeID/:geniusID">
            <Suspense fallback={centeredLoading}>
              <CreateLyricsSync />
            </Suspense >
          </Route>
          <Route path="/p/:youtubeID/:geniusID">
            <Suspense fallback={centeredLoading}>
              <GameEntry />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
