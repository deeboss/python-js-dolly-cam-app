import React from 'react';
import './assets/css/styles.scss';

import AppSettingsContextProvider from './contexts/AppSettingsContext';
import ControllerCanvas from './components/ControllerCanvas';
import StatusBar from './components/StatusBar';

function App() {
  return (
    <div className="App">
      <AppSettingsContextProvider>
        {/* This text is from App.js */}
        <StatusBar/>
        <ControllerCanvas/>
      </AppSettingsContextProvider>
    </div>
  );
}

export default App;
