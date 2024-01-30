import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import GameBoard from './pages/GameBoard';
import Start from './pages/Start';
import Hiscore from './pages/Hiscore';


function App() {

  return (
    <div className="App">
      <header className="App-header">      
        <Routes>
          <Route path='' element = { <Start/> } />
          <Route path='game' element = { <GameBoard/> } />
          <Route path='hiscore' element = { <Hiscore/> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;
