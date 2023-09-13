import './App.css';
import './logo192.png';
import { useState } from 'react';


import victorySound from "./sounds/toadWinner2.mp3";
import goodChoice from "./sounds/goodChoice.m4a";

function playVictorySound() {
  new Audio(victorySound).play();
}
function playGoodChoice() {
  new Audio(goodChoice).play();
}

let winningLineTest;

function Square({id, value, onSquareClick}) {
  let classStatus="square";
  if (value == "X") {
    classStatus = "redToad";
  }
  if (value == "O") {
    classStatus = "blueToad";
  }
  return (
    <button id={id} className={classStatus} onClick={onSquareClick}></button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    if (calculateWinner(squares)) {
      animateWinningLine(winningLineTest);
      return;
    }
    // playVictorySound();
 
      playGoodChoice();
    
    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  
  const winner = calculateWinner(squares);
  let status;
  let winningLine;
  if (winner) {
    playVictorySound();
    status = "Winner: " + winner[0];
    winningLine = winner[1];
    winningLineTest = winningLine;
    // animateWinningLine(winningLine);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className = "boardContainer">
        <div className="board-row">
          <Square id="square0" value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square id="square1" value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square id="square2" value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
          <Square id="square3" value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square id="square4" value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square id="square5" value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square id="square6" value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square id="square7" value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square id="square8" value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="moveButton" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <h1>Tic-Tac-Toad</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winningLine = lines[i];
      return [squares[a], winningLine];
    }
  }
  return null;
}

function animateWinningLine(winningLine) {
  // if (winningLine[0] == 0) {
  //   let winnerSquare = document.getElementById("square0");
  //   winnerSquare.classList.add("hidden");
  // }
  console.log(winningLine);
  let winnerOneId = "square";
  let winnerTwoId = "square";
  let winnerThreeId = "square";

  winnerOneId += winningLine[0];
  winnerTwoId += winningLine[1];
  winnerThreeId += winningLine[2];
  console.log(winnerOneId);
  console.log(winnerTwoId);
  console.log(winnerThreeId);

  let winnerSquare1 = document.getElementById(winnerOneId);
  let winnerSquare2 = document.getElementById(winnerTwoId);
  let winnerSquare3 = document.getElementById(winnerThreeId);
  console.log(winnerSquare1);
  console.log(winnerSquare2);
  console.log(winnerSquare3);
  winnerSquare1.classList.add("victoryAnimation");
  winnerSquare2.classList.add("victoryAnimation");
  winnerSquare3.classList.add("victoryAnimation");

  return null;
}



