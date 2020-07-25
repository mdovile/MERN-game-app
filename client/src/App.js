import React from 'react';
import './App.scss';
import Header from './components/layout/Header';
import { GlobalProvider } from './context/GlobalState';
import { Games } from './components/Games';
import { Details } from './components/Details';
import { AddedGamesTable } from './components/AddedGamesTable';
import 'regenerator-runtime/runtime'; //fixes regeneratorRuntime is not defined
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className="container">
          <Route exact path="/" component={Games} />
          <Route exact path="/details/:slug" component={Details} />
          <Route exact path="/myGames" component={AddedGamesTable} />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
