import React from 'react';
import './assets/css/styles.scss';

import AppSettingsContextProvider from './contexts/AppSettingsContext';
import DevCanvas from './components/DevCanvas';

function App() {
  return (
    <div className="App">
      <AppSettingsContextProvider>
        {/* This text is from App.js */}
        <DevCanvas/>
      </AppSettingsContextProvider>
    </div>
  );
}

export default App;
