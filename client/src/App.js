import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AppSettingsContextProvider from './contexts/AppSettingsContext';
import Home from './components/Home';
import DevToolsCanvas from './components/DevToolsCanvas';

function App() {
  return (
    <AppSettingsContextProvider>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dev" component={DevToolsCanvas} />
            <Redirect to="/" />
          </Switch>
      </BrowserRouter>
    </AppSettingsContextProvider>
  );
}

export default App;
