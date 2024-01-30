import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GameInfoContext } from '../context/GameInfoContext';

const Hiscore = () => {
    const {gameHistory} = useContext(GameInfoContext);
    const navigate = useNavigate();
    return (
        <div>
            <div>Hiscores</div>
            <div className='container-fluid'>
                
                {
                !gameHistory ? 
                <div>
                    No previous games
                </div> :
                <>
                    <div className='row border-bottom'>
                        <div className='col-3 m-3 '>
                            Player1
                        </div>
                        <div className='col-3 m-3'>
                            Player2
                        </div>
                        <div className='col-3 m-3'>
                            Winner
                        </div>
                    </div>
                    {gameHistory.map(game => 
                        <div className='row border-bottom' key={game.id}>
                            <div className='col-3 m-3'>
                                {game.player1}
                            </div>
                            <div className='col-3 m-3'>
                                {game.player2}
                            </div>
                            <div className='col-3 m-3'>
                                {game.winner}
                            </div>
                        </div>
                    )}
                </>
                
                }
                <button className="m-4" onClick={() => navigate("/")} >New Game</button> <br />
                    
            </div>
        </div>
    )
}

export default Hiscore