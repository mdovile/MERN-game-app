import React from 'react';
import './App.scss';
import Header from './components/layout/Header';
import { GlobalProvider } from './context/GlobalState';
import { Games } from './components/Games';
import { Details } from './components/Details';
import { AddedGamesTable } from './components/AddedGamesTable';
import { Login } from './components/Login';
import { Register } from './components/Register';
import 'regenerator-runtime/runtime'; //fixes regeneratorRuntime is not defined
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
          <Route exact path="/" component={Games} />
          <div className="container">
          <Route exact path="/details/:slug" component={Details} />
          <Route exact path="/myGames" component={AddedGamesTable} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
