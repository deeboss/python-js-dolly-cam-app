import React from 'react';
import './App.css';

import MyAppContextProvider from './contexts/MyAppContext';

import MyFirstComponent from './components/MyFirstComponent';

function App() {
  return (
    <div className="App">
      <MyAppContextProvider>
        {/* This text is from App.js */}
        <MyFirstComponent/>
      </MyAppContextProvider>
    </div>
  );
}

export default App;
