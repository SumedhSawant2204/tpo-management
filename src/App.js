// src/App.js
import React from 'react';
import './App.css';
import TpoTable from './components/TpoTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TPO Management System</h1>
      </header>
      <main>
        <TpoTable />
      </main>
    </div>
  );
}

export default App;
