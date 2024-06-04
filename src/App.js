// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import GameOver from './GameOver';

const App = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' });
  const [currentImage, setCurrentImage] = useState('/start.png');

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, calculateTimeInterval(score));
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft, score]);

  useEffect(() => {
    if (gameStarted) {
      updateImage(timeLeft);
    }
  }, [timeLeft, gameStarted]);

  const startGame = () => {
    setGameActive(true);
    setGameStarted(true);
    setTimeLeft(10);
    setScore(0);
    moveButton();
    setCurrentImage('/10s.png');
  };

  const calculateTimeInterval = (score) => {
    return Math.max(1000 - score * 50, 100);
  };

  const moveButton = () => {
    const top = Math.floor(Math.random() * 90) + '%';
    const left = Math.floor(Math.random() * 90) + '%';
    setButtonPosition({ top, left });
  };

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1);
      setTimeLeft(10);
      moveButton();
      setCurrentImage('/10s.png');
    }
  };

  const handleRestart = () => {
    setGameActive(true);
    setTimeLeft(10);
    setScore(0);
    moveButton();
    setCurrentImage('/10s.png');
  };

  const updateImage = (timeLeft) => {
    switch (timeLeft) {
      case 10:
        setCurrentImage('/10s.png');
        break;
      case 8:
        setCurrentImage('/8s.png');
        break;
      case 6:
        setCurrentImage('/6s.png');
        break;
      case 4:
        setCurrentImage('/4s.png');
        break;
      case 2:
        setCurrentImage('/2s.png');
        break;
      case 0:
        setCurrentImage(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {!gameStarted || gameActive ? (
          <>
            <h1>打瞌睡救星</h1>
            <p>持續的叫醒你自己，否則會面臨災難般的後果</p>
          </>
        ) : null}
        {gameActive && <img src={currentImage} alt="Sleepy Person" className="sleepy-person" />}
        {!gameStarted ? (
          <button onClick={startGame} className="start-button">開始</button>
        ) : gameActive ? (
          <>
            <button
              onClick={handleClick}
              style={{ position: 'absolute', top: buttonPosition.top, left: buttonPosition.left }}
              className="click-button"
            >
              起床!
            </button>
            <div className="score-time-container">
              <h2>醒來次數: {score}</h2>
              <h2>剩餘睡著時間: {timeLeft}s</h2>
            </div>
          </>
        ) : (
          <GameOver score={score} onRestart={handleRestart} />
        )}
      </header>
    </div>
  );
};

export default App;
