import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AppSettingsContextProvider from './contexts/AppSettingsContext';
import VehicleContextProvier from './contexts/VehicleContext';
import Home from './components/Home';
import DevToolsCanvas from './components/DevToolsCanvas';

function App() {
  return (
    <AppSettingsContextProvider>
      <VehicleContextProvier>
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dev" component={DevToolsCanvas} />
              <Redirect to="/" />
            </Switch>
        </BrowserRouter>
      </VehicleContextProvier>
    </AppSettingsContextProvider>
  );
}

export default App;
