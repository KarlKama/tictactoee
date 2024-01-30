import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/GameBoard.css";
import { GameInfoContext } from '../context/GameInfoContext';

const GameBoard = () => {
    const [gameboard, setGameboard] = useState(
        [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"]
        ]
      );
      const [activePlayer, setActivePlayer] = useState("X");
      const [winCondition, setWinCondition] = useState(false);
      const navigate = useNavigate();
      const {player1, player2, gameHistory, setGameHistory, gameNumber, setGameNumber} = useContext(GameInfoContext);
      let validMove = false;
    
      const handleClick = (id) => {
        const result = updateValueById(id.toString(), gameboard, activePlayer);
     
        if (validMove) {
          endTurnActions(result);
        }
      };
    
      const endTurnActions = (result) => {
        setGameboard(result);
        if (checkWinConditions()) {
            let newGameHistory = gameHistory;
            setGameNumber(gameNumber + 1);
            newGameHistory.push({id:gameNumber, player1: player1, player2: player2, winner: activePlayerToPlayerName()})
            setGameHistory(newGameHistory);
            setWinCondition(true);
        } else {
          activePlayer === "X" ? setActivePlayer("O") : setActivePlayer("X");
        }
      }
    
      const updateValueById = (id, myList, value) => {
        for (let i = 0; i < myList.length; i++) {
          for (let j = 0; j < myList[i].length; j++) {
              if (myList[i][j] === id) {
                myList[i][j] = value;
                validMove = true;
                return myList;
              }
          }
        }
        validMove = false;
        // Return a default value or handle the case where the id is not found
        return gameboard; // You can change this to an appropriate default value or error handling
      }
    
      const checkWinConditions = () => {
        return checkRowsCondition() || checkColumnsCondition() || checkDiagonalCondition();
      }
    
      const checkRowsCondition = () => {
        let rowWinCondtionMet = false;
        for (let i = 0; i < gameboard.length; i++) {
            if (areAllItemsSame(gameboard[i])) {
              rowWinCondtionMet = true;
            }
        }
        return rowWinCondtionMet;
      }
    
      const checkColumnsCondition = () => {
        let columnsWinCondtionMet = false;
        const columnCombinations = [
          [
           gameboard[0][0],
           gameboard[1][0],
           gameboard[2][0]
          ], 
          [
            gameboard[0][1],
            gameboard[1][1], 
            gameboard[2][1]
          ], 
          [
            gameboard[0][2],
            gameboard[1][2],
            gameboard[2][2]]
          ];
        
        columnCombinations.forEach(combination => {
          if (areAllItemsSame(combination)) {
            columnsWinCondtionMet = true;
          }
        });
        
        return columnsWinCondtionMet;
      }
    
      const checkDiagonalCondition = () => {
        let diagonalWinCondtionMet = false;
        const diagonalCombinations = [
          [
           gameboard[0][0],
           gameboard[1][1],
           gameboard[2][2]
          ], 
          [
            gameboard[0][2],
            gameboard[1][1], 
            gameboard[2][0]
          ]
          ];
        
        diagonalCombinations.forEach(combination => {
          if (areAllItemsSame(combination)) {
            diagonalWinCondtionMet = true;
          }
        });
        
        return diagonalWinCondtionMet;
      }
    
      const areAllItemsSame = (arr) => {
        if (arr.length === 0) {
          return true;
        }
      
        const firstItem = arr[0];
      
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] !== firstItem) {
            return false;
          }
        }
      
        return true;
      }

      const activePlayerToPlayerName = () => {
        return activePlayer === "X"? player1 : player2
      }
    
    
      return (
            <div className='container'>
              {
                winCondition ?  
                <div className='row'>
                  {activePlayerToPlayerName()} won!
                </div> : <></>
              }
              <div className='row'>
                <div className='col-6'>
                    Player 1 (X): {player1}
                </div>
                <div className='col-6'>
                    Player 2 (O): {player2}
                </div>
              </div>
    
              <div className='row'>
                <div className='col-3 gameboard-box' onClick={() => handleClick(1)}>{gameboard[0][0]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(2)}>{gameboard[0][1]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(3)}>{gameboard[0][2]}</div>
              </div>
              <div className='row'>
                <div className='col-3 gameboard-box' onClick={() => handleClick(4)}>{gameboard[1][0]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(5)}>{gameboard[1][1]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(6)}>{gameboard[1][2]}</div>
              </div>
              <div className='row'>
                <div className='col-3 gameboard-box' onClick={() => handleClick(7)}>{gameboard[2][0]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(8)}>{gameboard[2][1]}</div>
                <div className='col-3 gameboard-box' onClick={() => handleClick(9)}>{gameboard[2][2]}</div>
              </div>
              <button onClick={() => navigate("/hiscore")} >View Hiscores</button> <br />
            </div>
      );
}

export default GameBoard