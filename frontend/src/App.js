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


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<Loading centered/>}>
              <Home />
            </Suspense>
          </Route>
          <Route path="/g/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <SelectedGeniusResult />
            </Suspense>
          </Route>
          <Route path="/s/:youtubeID/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <CreateLyricsSync />
            </Suspense >
          </Route>
          <Route path="/p/:youtubeID/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <GameEntry />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
