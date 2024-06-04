// src/GameOver.js
import React from 'react';
import './GameOver.css';

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over-container">
      <img src="/gameover.png" alt="Game Over" className="game-over-image" />
      <h2>你進入了香甜的夢鄉，也墮入了被當的火海</h2>
      <p>你醒來的次數: {score}</p>
      <button onClick={onRestart} className="restart-button">還敢皮?</button>
    </div>
  );
};

export default GameOver;
