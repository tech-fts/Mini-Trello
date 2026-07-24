import React from 'react';
import Header from './components/Common/Header';
import Board from './components/Kanban/Board';
import './assets/styles.css';

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        <Board />
      </main>
    </div>
  );
}
