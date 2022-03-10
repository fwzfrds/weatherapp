import React from 'react';
import './App.css';
import Weather from './components/weather';
import LocContextProvider from './data/context/LocContext';

function App() {
  return (
    <div className="App">
      <LocContextProvider>
        <Weather />
      </LocContextProvider>
    </div>
  );
}

export default App;
