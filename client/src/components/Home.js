import React from 'react';
import '../assets/css/styles.scss';

import AppSettingsContextProvider from '../contexts/AppSettingsContext';
import ControllerCanvas from './ControllerCanvas';
import StatusBar from './StatusBar';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';

function Home() {
  return (
    <div className="App">
      <AppSettingsContextProvider>
        <StatusBar/>
        <ControllerCanvas/>
        <KeyboardControlsCanvas />
      </AppSettingsContextProvider>
    </div>
  );
}

export default Home;
