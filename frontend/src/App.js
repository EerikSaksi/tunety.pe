import React, {Suspense, lazy} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Loading from 'components/universal/loading'

const SelectedGeniusResult = lazy(() => import('components/navigation/selected_genius_result'))
const CreateLyricsSync = lazy(() => import('components/lyrics/syncing/lyrics_sync_router.js/'))
const GameEntry = lazy(() => import('components/lyrics/playing/game_entry/'))
const Home = lazy(() => import('components/navigation/home'));
const Profile = lazy(() => import('components/navigation/profile'));

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
          <Route path="/genius/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <SelectedGeniusResult />
            </Suspense>
          </Route>
          <Route path="/sync/:youtubeID/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <CreateLyricsSync />
            </Suspense >
          </Route>
          <Route path="/play/:userName/:youtubeID/:geniusID">
            <Suspense fallback={<Loading centered/>}>
              <GameEntry />
            </Suspense>
          </Route>
          <Route path="/user/:userName">
            <Suspense fallback={<Loading centered/>}>
              <Profile />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
