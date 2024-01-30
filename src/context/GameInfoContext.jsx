import { createContext, useState } from 'react';

export const GameInfoContext = createContext({ 
    player1: "",
    player2: "",
    gameNumber: 0,
    gameHistory: ([]),
    setPlayer1: (string) => {},
    setPlayer2: (string) => {},
    setGameNumber: (number) => {},
    setGameHistory: (array) => {}
});

export function GameInfoContextProvider({ children }) {

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [gameNumber, setGameNumber] = useState(0);

    const [gameHistory, setGameHistory] = useState([]); //{id:"1", player1: "test1", player2: "test2", winner: "test1"}

    return (
        <GameInfoContext.Provider value={{
            player1, setPlayer1,
            player2, setPlayer2,
            gameNumber, setGameNumber,
            gameHistory, setGameHistory 
            
            }}>
            { children }
        </GameInfoContext.Provider>
    )
}