import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameInfoContext } from '../context/GameInfoContext';

const Start = () => {
    const player1Ref = useRef();
    const player2Ref = useRef();
    const navigate = useNavigate();
    const {setPlayer1, setPlayer2, gameHistory} = useContext(GameInfoContext);

    const startGame = () => {
        let matchFound = false;
        let winner = "";
        gameHistory.forEach(game => {
            if ((game.player1 === player1Ref.current.value || game.player1 === player2Ref.current.value) && (game.player2 === player1Ref.current.value || game.player2 === player2Ref.current.value)) {
                matchFound = true;
                winner = game.winner;
            }
        });
        
        if (matchFound) {
            setPlayer1(winner);
            setPlayer2(winner === player1Ref.current.value ? player2Ref.current.value : player1Ref.current.value);
        } else {
            setPlayer1(player1Ref.current.value);
            setPlayer2(player2Ref.current.value);
        }
        
        navigate("/game")
    }

    return (
        <div>
            <label>{"Player 1"}</label> <br />
            <input ref={player1Ref} type="text" /> <br />

            <label>{"Player 2"}</label> <br />
            <input ref={player2Ref} type="text"/> <br />

            <button onClick={() => startGame()} >Start Game</button> <br />
            <button onClick={() => navigate("/hiscore")} >View Hiscores</button> <br />
        </div>
    )
}

export default Start